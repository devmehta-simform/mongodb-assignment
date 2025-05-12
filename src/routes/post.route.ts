import { Router } from 'express';
import { deletePostById, getAllPosts, getPostById, updatePostById, createPost } from '../services/post.service';

const postRouter = Router();

postRouter.route('/').get(getAllPosts).post(createPost);
postRouter.route('/:id').get(getPostById).patch(updatePostById).delete(deletePostById);

export { postRouter };
