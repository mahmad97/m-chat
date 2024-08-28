import { Router } from 'express';

import { loginRouter } from './login.js';
import { signupRouter } from './signup.js';

const authRouter = Router();

authRouter.use('/login', loginRouter);
authRouter.use('/signup', signupRouter);

export { authRouter };
