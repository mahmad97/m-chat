'use server';

import { cookies } from 'next/headers';

import { cookieExtractor } from 'lib/functions/cookieExtractor';
import { loginFormSchema } from 'lib/schemas/loginFormSchema';

interface LoginResponse {
	success: boolean;
	message: string;
	errors?: { name: string | number; type: string; message: string }[];
}

const submitLoginForm = async (
	prevState: LoginResponse,
	payload: FormData
): Promise<LoginResponse> => {
	const formData = Object.fromEntries(payload);
	const parsed = loginFormSchema.safeParse(formData);

	if (!parsed.success) {
		const parsedErrors = parsed.error.issues.map(({ path, code, message }) => {
			return { name: path[0], type: code, message };
		});

		return {
			success: false,
			message: 'Invalid form data.',
			errors: parsedErrors,
		};
	}

	try {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		const serverResponse = await fetch(`${process.env.API_URL}/auth/login`, {
			cache: 'no-store',
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(parsed.data),
		});

		const cookieStrings = serverResponse.headers.getSetCookie();

		cookieStrings.forEach((cookieString) => {
			cookies().set(cookieExtractor(cookieString));
		});

		const responseBody = (await serverResponse.json()) as LoginResponse;

		return responseBody;
	} catch (error) {
		console.error(error);
	}

	return {
		success: false,
		message: 'Server error.',
	};
};

export { submitLoginForm };
