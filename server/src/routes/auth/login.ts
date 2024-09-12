import type { CookieOptions } from 'express';

import { createHash } from 'crypto';
import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { db, pgpromise } from '../../db.js';
import { loginPostSchema } from '../../models/authModel.js';

const loginRouter = Router();

const QueryResultError = pgpromise.errors.QueryResultError;
const qrec = pgpromise.errors.queryResultErrorCode;

const InvalidLoginResponse = {
	success: false,
	message: 'Login error.',
	errors: [
		{
			name: 'username',
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

loginRouter.post('/', async (req, res) => {
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

	let responseDispatched = false;

	const tokens = await db
		.task(async (t) => {
			const userId: number = await t
				.one({
					text: 'SELECT id FROM users WHERE username = $1',
					values: [parsed.data.username],
				})
				.then((user) => user.id)
				.catch((error) => {
					if (error instanceof QueryResultError) {
						if (error.code === qrec.noData) {
							res.status(400).json(InvalidLoginResponse);
						}
					} else {
						console.log(error);
						res.status(500).json({ success: false, message: 'Server Error' });
					}

					responseDispatched = true;
				});

			if (responseDispatched) return;

			const userAuth = await t.one({
				text: 'SELECT * FROM users_authentication WHERE id = $1',
				values: [userId],
			});

			const passwordHash = createHash('sha256')
				.update(userAuth.salt)
				.update(parsed.data.password)
				.digest('base64');

			if (passwordHash !== userAuth.password_hash) {
				res.status(400).json(InvalidLoginResponse);

				responseDispatched = true;
				return;
			}

			const accessToken = jwt.sign(
				{ userId: userAuth.id },
				process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
				{ expiresIn: '15m' }
			);
			const refreshToken = jwt.sign(
				{ userId: userAuth.id },
				process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
				{ expiresIn: '1d' }
			);

			const refreshTokenHash = createHash('sha256')
				.update(refreshToken)
				.digest('base64');

			db.none({
				text: 'INSERT INTO refresh_tokens(token_hash) VALUES($1)',
				values: [refreshTokenHash],
			});

			return { accessToken, refreshToken };
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ success: false, message: 'Server Error' });
			responseDispatched = true;
		});

	if (responseDispatched) return;

	const defaultOptions: CookieOptions = {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	};

	res
		.cookie('accessToken', tokens?.accessToken, {
			...defaultOptions,
			maxAge: 15 * 60 * 1000,
		})
		.cookie('refreshToken', tokens?.refreshToken, {
			...defaultOptions,
			maxAge: 24 * 60 * 60 * 1000,
		})
		.json({
			success: true,
			message: 'Login successful.',
		});
});

export { loginRouter };
