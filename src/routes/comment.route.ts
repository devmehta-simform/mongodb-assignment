import { Router } from 'express';
import { getAllCommentsForPost, createCommentForPost, deleteCommentForPost, updateCommentForPost } from '../services/comment.service';

const commentRouter = Router();

commentRouter.route('/').get(getAllCommentsForPost).post(createCommentForPost);
commentRouter.route('/:id').patch(updateCommentForPost).delete(deleteCommentForPost);

export { commentRouter };
