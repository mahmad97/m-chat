import { createHash } from 'crypto';
import { Router } from 'express';

import { db } from 'db.js';
import { loginPostSchema } from 'models/authModel.js';

const loginRouter = Router();

const InvalidLoginResponse = {
	success: false,
	message: 'Login error.',
	errors: [
		{
			name: 'email',
			type: 'custom',
			message: 'Invalid login credentials',
		},
		{
			name: 'password',
			type: 'custom',
			message: 'Invalid login credentials',
		},
	],
};

loginRouter.post('/', (req, res) => {
	const parsed = loginPostSchema.safeParse(req.body);

	if (!parsed.success) {
		const parsedErrors = parsed.error.issues.map(({ path, code, message }) => {
			return { name: path[0], type: code, message };
		});

		res.status(400).json({
			success: false,
			message: 'Invalid form data.',
			errors: parsedErrors,
		});

		return;
	}

	db.task(async (t) => {
		const user = await t.oneOrNone({
			text: 'SELECT id FROM users WHERE email = $1',
			values: [parsed.data.email],
		});

		if (!user) {
			throw new Error('email_error');
		}

		return await t.one({
			text: 'SELECT salt, password_hash FROM users_authentication WHERE id = $1',
			values: [user.id],
		});
	})
		.then((user) => {
			const passwordHash = createHash('sha256')
				.update(user.salt)
				.update(parsed.data.password)
				.digest('base64');

			if (passwordHash != user.password_hash) {
				res.status(400).json(InvalidLoginResponse);
			} else {
				res.json({
					success: true,
					message: 'Login successful.',
				});
			}
		})
		.catch((error) => {
			if (error.message == 'email_error') {
				res.status(400).json(InvalidLoginResponse);
			} else {
				console.log(error);
				res.status(500).json({ success: false, message: 'Server Error' });
			}
		});
});

export { loginRouter };
