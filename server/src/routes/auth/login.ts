import { createHash } from 'crypto';
import { Router } from 'express';

import { loginPostSchema } from 'models/authModel.js';

const loginRouter = Router();

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

	const passwordHash = createHash('sha256')
		.update(parsed.data.password)
		.digest('hex');

	// get authentication record from db based on email
	// if email not in db then return authentication error

	// check if passwordHash is correct
	// if not then return authentication error

	// return {
	//   success: false,
	//   message: 'Authentication failure',
	//   errors: [
	//     {
	//       name: 'password',
	//       type: 'custom',
	//       message: 'Incorrect password and/or email.',
	//     },
	//   ],
	// };

	res.send({ message: `Password hashed to: asd` });
});

export { loginRouter };
