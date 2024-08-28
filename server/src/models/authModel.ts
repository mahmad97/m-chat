import { z } from 'zod';

const loginPostSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Invalid email address.' }),
	password: z.string().min(1, { message: 'Password is required.' }),
});

const signupPostchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'Email is required.' })
			.email({ message: 'Invalid email address.' }),
		password: z
			.string()
			.min(1, { message: 'Password is required.' })
			.min(8, { message: 'Password must be atleast 8 characters long.' }),
		confirmPassword: z.string().min(1, { message: 'Password is required.' }),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export { loginPostSchema, signupPostchema };
