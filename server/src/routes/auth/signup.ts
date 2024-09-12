import { createHash, randomBytes } from 'crypto';
import { Router } from 'express';

import { db, pgpromise } from '../../db.js';
import { signupPostSchema } from '../../models/authModel.js';

const signupRouter = Router();

const QueryResultError = pgpromise.errors.QueryResultError;
const qrec = pgpromise.errors.queryResultErrorCode;

const EmailExistsResponse = {
	success: false,
	message: 'Email already exists',
	errors: [
		{
			name: 'email',
			type: 'custom',
			message: 'Account already exists with this email.',
		},
	],
};

const UsernameExistsResponse = {
	success: false,
	message: 'Username already exists',
	errors: [
		{
			name: 'username',
			type: 'custom',
			message: 'Account already exists with this username.',
		},
	],
};

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

	let responseDispatched = false;

	await db.task(async (t1) => {
		await t1
			.none({
				text: 'SELECT id FROM users WHERE email = $1',
				values: [email],
			})
			.catch((error) => {
				if (error instanceof QueryResultError) {
					if (error.code === qrec.notEmpty) {
						res.status(400).json(EmailExistsResponse);
					}
				} else {
					console.log(error);
					res.status(500).json({ success: false, message: 'Server Error' });
				}

				responseDispatched = true;
			});

		if (responseDispatched) return;

		await t1
			.none({
				text: 'SELECT id FROM users WHERE username = $1',
				values: [username],
			})
			.catch((error) => {
				if (error instanceof QueryResultError) {
					if (error.code === qrec.notEmpty) {
						res.status(400).json(UsernameExistsResponse);
					}
				} else {
					console.log(error);
					res.status(500).json({ success: false, message: 'Server Error' });
				}

				responseDispatched = true;
			});

		if (responseDispatched) return;

		const salt = randomBytes(16).toString('base64');
		const passwordHash = createHash('sha256')
			.update(salt)
			.update(parsed.data.password)
			.digest('base64');

		await t1
			.tx(async (t2) => {
				const userId: number = await t2
					.one({
						text: 'INSERT INTO users(email, username, displayname) VALUES($1, $2, $2) RETURNING id',
						values: [email, username],
					})
					.then((user) => user.id);

				t2.none({
					text: 'INSERT INTO users_authentication(id, salt, password_hash) VALUES($1, $2, $3)',
					values: [userId, salt, passwordHash],
				});
			})
			.catch((error) => {
				if (error.constraint === 'users_email_key') {
					res.status(400).json(EmailExistsResponse);
				} else if (error.constraint === 'users_username_key') {
					res.status(400).json(UsernameExistsResponse);
				} else {
					console.log(error);
					res.status(500).json({ success: false, message: 'Server Error' });
				}

				responseDispatched = true;
			});
	});

	if (responseDispatched) return;

	res.json({ success: true, message: 'Account created.' });
});

export { signupRouter };
