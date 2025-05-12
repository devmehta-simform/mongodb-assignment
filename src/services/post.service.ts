import { Post as PostModel } from '../models/db';
import { Post } from '../types/post';
import { middlewareWrapper } from '../utils/asyncMiddlewareWrapper';

export const getAllPosts = middlewareWrapper(async (req, res, next) => {
  const posts = await PostModel.aggregate([{ $sort: { id: -1 } }]);
  return res.status(200).json(posts);
});

export const getPostById = middlewareWrapper(async (req, res, next) => {
  const post = await PostModel.findOne({ id: req.params['id'] });
  return res.status(200).json(post);
});

export const createPost = middlewareWrapper(async (req, res, next) => {
  const post: Post = req.body;
  await PostModel.create(post);
  return res.status(201).json(post);
});

export const updatePostById = middlewareWrapper(async (req, res, next) => {
  const newPost: Post = req.body;
  await PostModel.updateOne({ id: req.params['id'] }, newPost);
  return res.status(204).json();
});

export const deletePostById = middlewareWrapper(async (req, res, next) => {
  await PostModel.deleteOne({ id: req.params['id'] });
  return res.status(204).json();
});
