import { Router } from 'express';
import { loginUser } from '../services/user.service';

const userRouter = Router();

userRouter.route('/login').post(loginUser);

export { userRouter };
