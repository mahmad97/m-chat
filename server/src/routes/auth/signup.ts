import { createHash } from 'crypto';
import { Router } from 'express';

const signupRouter = Router();

signupRouter.post('/', (req, res) => {
	const data = req.body;
	const passwordHash = createHash('sha256').update(data.password).digest('hex');

	res.send({ message: `Password hashed to: ${passwordHash}` });
});

export { signupRouter };
