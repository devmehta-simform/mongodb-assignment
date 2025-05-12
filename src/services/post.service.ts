import { Post } from '../models/db';
import { middlewareWrapper } from '../utils/asyncMiddlewareWrapper';

export const getAllPosts = middlewareWrapper(async (req, res, next) => {
  const posts = await Post.find();
  return res.status(200).json(posts);
});
