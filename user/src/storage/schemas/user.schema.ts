import { IUser } from '@src/models/i-credentials';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const User = new Schema<IUser>(
  {
    login: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false },
);

export const UserModel = mongoose.model('User', User);
