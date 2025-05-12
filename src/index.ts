import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './utils/connectDb';
import { postRouter } from './routes/post.route';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors({ origin: ['http://localhost:4200'] }));
app.use(express.json());
app.use('/post', postRouter);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`server listening on port ${PORT}`);
});
