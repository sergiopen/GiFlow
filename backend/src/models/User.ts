import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  avatar: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);
