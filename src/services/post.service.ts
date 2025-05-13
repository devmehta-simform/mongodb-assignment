import { Post as PostModel } from '../models/db';
import { Post } from '../types/post';
import { middlewareWrapper } from '../utils/asyncMiddlewareWrapper';

export const getAllPosts = middlewareWrapper(async (req, res, next) => {
  const page = req.query['page']?.toString();
  const pageOffset = req.query['pageOffset']?.toString();
  const searchQuery = req.query['search']?.toString();
  if (page && pageOffset) {
    const tmpPage = parseInt(page);
    const tmpPageOffset = parseInt(pageOffset);

    if (!searchQuery) {
      const posts = await PostModel.aggregate([
        {
          $facet: {
            posts: [
              {
                $skip: (tmpPage - 1) * tmpPageOffset,
              },
              {
                $limit: tmpPageOffset,
              },
            ],
            totalItems: [
              {
                $count: 'id',
              },
            ],
          },
        },
      ]);
      return res.status(200).json({ posts: posts[0].posts, totalItems: posts[0].totalItems[0]?.id });
    } else {
      const posts = await PostModel.aggregate([
        {
          $match: {
            $or: [
              {
                title: { $regex: searchQuery },
              },
              {
                body: { $regex: searchQuery },
              },
            ],
          },
        },
        {
          $facet: {
            posts: [
              {
                $skip: (tmpPage - 1) * tmpPageOffset,
              },
              {
                $limit: tmpPageOffset,
              },
            ],
            totalItems: [
              {
                $count: 'id',
              },
            ],
          },
        },
      ]);
      return res.status(200).json({ posts: posts[0].posts, totalItems: posts[0].totalItems[0]?.id });
    }
  } else {
    const posts = await PostModel.aggregate([
      {
        $sort: { id: -1 },
      },
    ]);
    return res.status(200).json(posts);
  }
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
