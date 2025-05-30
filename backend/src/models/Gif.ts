import { Schema, model } from 'mongoose';

export interface IGif {
  url: string;
  title: string;
  likes: number;
  tags: string[];
  likedBy: string[];
  views: number;
}

const gifSchema = new Schema<IGif>(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IGif>('Gif', gifSchema);
