import { User as UserModel } from '../models/db';
import { middlewareWrapper } from '../utils/asyncMiddlewareWrapper';

export const loginUser = middlewareWrapper(async (req, res, next) => {
  const password = 'Simform123';
  const { email: userEmail, password: userPassword } = req.body;
  const userExists = await UserModel.exists({ email: userEmail });
  if (userExists !== null && userPassword === password) {
    return res.status(200).json();
  }
  return res.status(401).json('wrong credentials');
});
