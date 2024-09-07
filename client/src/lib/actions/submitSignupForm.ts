'use server';

import { signupFormSchema } from 'lib/schemas/signupFormSchema';

interface SignupResponse {
	success: boolean;
	message: string;
	errors?: { name: string | number; type: string; message: string }[];
}

const submitSignupForm = async (
	prevState: SignupResponse,
	payload: FormData
): Promise<SignupResponse> => {
	const formData = Object.fromEntries(payload);
	const parsed = signupFormSchema.safeParse(formData);

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
		const serverResponse = await fetch(`${process.env.API_URL}/auth/signup`, {
			cache: 'no-store',
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(parsed.data),
		});

		const responseBody = (await serverResponse.json()) as SignupResponse;

		console.log(responseBody);

		return responseBody;
	} catch (error) {
		console.error(error);
	}

	return {
		success: false,
		message: 'Server error.',
	};
};

export { submitSignupForm };
