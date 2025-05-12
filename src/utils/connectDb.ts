import mongoose from 'mongoose';

export async function connectDb() {
  const connectString = process.env.MONGODB_CONNECTION_STRING;
  if (connectString) {
    await mongoose.connect(connectString);
    console.log('db connected successfully');
  } else throw new Error('connection string not provided');
}
