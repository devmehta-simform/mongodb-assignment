import { Comment as CommentModel } from '../models/db';
import { Comment } from '../types/comment';
import { middlewareWrapper } from '../utils/asyncMiddlewareWrapper';

export const getAllCommentsForPost = middlewareWrapper(async (req, res, next) => {
  const postId = req.query['postId'];
  if (postId) {
    const comments = await CommentModel.aggregate([
      {
        $match: { postId: parseInt(postId.toString()) },
      },
    ]);
    return res.status(200).json(comments);
  } else throw new Error('postId not provided');
});

export const createCommentForPost = middlewareWrapper(async (req, res, next) => {
  const comment: Comment = req.body;
  await CommentModel.create(comment);
  return res.status(204).json();
});

export const updateCommentForPost = middlewareWrapper(async (req, res, next) => {
  const comment: Comment = req.body;
  const commentId = req.params['id'];
  const postId = req.query['postId'];
  if (postId) {
    await CommentModel.updateOne({ postId: postId, id: commentId }, comment);
    return res.status(204).json();
  } else throw new Error('postId not provided');
});

export const deleteCommentForPost = middlewareWrapper(async (req, res, next) => {
  const postId = req.query['postId'];
  const commentId = req.params['id'];
  if (postId) {
    await CommentModel.deleteOne({ postId, id: commentId });
    return res.status(204).json();
  } else throw new Error('postId not provided');
});
