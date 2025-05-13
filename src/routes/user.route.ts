import { Router } from 'express';
import { loginUser, getUser } from '../services/user.service';

const userRouter = Router();

userRouter.route('/login').post(loginUser);
userRouter.route('/:id').get(getUser);
export { userRouter };
