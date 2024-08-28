import { Router } from 'express';

import { authRouter } from './auth/index.js';

const router = Router();

router.use('/auth', authRouter);

router.get('/', (_, res) => {
	res.send({ message: 'Hello, TypeScript with Express hello!' });
});

export { router };
