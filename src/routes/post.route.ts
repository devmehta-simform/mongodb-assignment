import { Router } from 'express';
import { getAllPosts } from '../services/post.service';

const postRouter = Router();
postRouter.route('/').get(getAllPosts);

export { postRouter };
