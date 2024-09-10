import { createHash, randomBytes } from 'crypto';
import { Router } from 'express';

import { db } from 'db.js';
import { signupPostSchema } from 'models/authModel.js';

const signupRouter = Router();

signupRouter.post('/', async (req, res) => {
	const parsed = signupPostSchema.safeParse(req.body);

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

	const email = parsed.data.email;
	const username = parsed.data.username;
	const salt = randomBytes(16).toString('base64');
	const passwordHash = createHash('sha256')
		.update(salt)
		.update(parsed.data.password)
		.digest('base64');

	db.tx(async (t) => {
		const userId = await t
			.one({
				text: 'INSERT INTO users(email, username, displayname) VALUES($1, $2, $2) RETURNING id',
				values: [email, username],
			})
			.then((user) => user.id);

		t.none({
			text: 'INSERT INTO users_authentication(id, salt, password_hash) VALUES($1, $2, $3)',
			values: [userId, salt, passwordHash],
		});
	})
		.then(() => {
			res.json({
				success: true,
				message: 'Account created.',
			});
		})
		.catch((error) => {
			if (error.constraint === 'users_email_key') {
				res.status(400).json({
					success: false,
					message: 'Email already exists',
					errors: [
						{
							name: 'email',
							type: 'custom',
							message: 'Account already exists with this email.',
						},
					],
				});
			} else if (error.constraint === 'users_username_key') {
				res.status(400).json({
					success: false,
					message: 'Username already exists',
					errors: [
						{
							name: 'username',
							type: 'custom',
							message: 'Account already exists with this username.',
						},
					],
				});
			} else {
				console.log(error);
				res.status(500).json({ success: false, message: 'Server Error' });
			}
		});
});

export { signupRouter };
