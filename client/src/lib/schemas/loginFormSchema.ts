import { z } from 'zod';

const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email address.' }),
	password: z.string().min(1, { message: 'Password is required.' }),
});

export { loginFormSchema };
