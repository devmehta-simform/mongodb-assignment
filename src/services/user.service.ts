import { User as UserModel } from '../models/db';
import { middlewareWrapper } from '../utils/asyncMiddlewareWrapper';

export const loginUser = middlewareWrapper(async (req, res, next) => {
  const password = 'Simform123';
  const { email: userEmail, password: userPassword } = req.body;
  const user = await UserModel.findOne({ email: userEmail });
  if (user && userPassword === password) {
    return res.status(200).json(user);
  }
  return res.status(401).json('wrong credentials');
});

export const getUser = middlewareWrapper(async (req, res, next) => {
  const id = req.params['id'];
  const user = await UserModel.findOne({ id }, { email: 1, id: 1, name: 1, username: 1, _id: 0 });
  return res.status(200).json(user);
});
