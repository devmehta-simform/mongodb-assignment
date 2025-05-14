import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/connectDb';
import { postRouter } from './routes/post.route';
import { commentRouter } from './routes/comment.route';
import cors from 'cors';
import { userRouter } from './routes/user.route';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();
const app = express();
const PORT = 3000;
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(express.json());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, async () => {
  await connectDb();
  console.log(`server listening on port ${PORT}`);
});
