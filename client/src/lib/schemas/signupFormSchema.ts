import { z } from 'zod';

const signupFormSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'Email is required.' })
			.email({ message: 'Invalid email address.' }),
		password: z
			.string()
			.min(1, { message: 'Password is required.' })
			.regex(/^[A-Za-z0-9@!#$._-]*$/, {
				message: 'Password can only have @!#$._- special characters.',
			})
			.min(8, { message: 'Password must be atleast 8 characters long.' })
			.regex(/.*[a-zA-Z].*/, {
				message: 'Password must have at least one alphabet.',
			})
			.regex(/.*[0-9].*/, {
				message: 'Password must have at least one number.',
			}),
		confirmPassword: z.string().min(1, { message: 'Password is required.' }),
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export { signupFormSchema };
