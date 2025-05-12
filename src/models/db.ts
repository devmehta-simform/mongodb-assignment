import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  username: String,
  email: String,
});

const PostSchema = new mongoose.Schema({
  userId: String,
  id: String,
  title: String,
  body: String,
});

const CommentSchema = new mongoose.Schema({
  postId: String,
  id: String,
  name: String,
  email: String,
  body: String,
});

const User = mongoose.model('Users', UserSchema);
const Post = mongoose.model('Posts', PostSchema);
const Comment = mongoose.model('Comments', CommentSchema);

export { User, Post, Comment };
