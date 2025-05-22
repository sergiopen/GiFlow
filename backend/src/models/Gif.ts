import { Schema, model } from 'mongoose';

export interface IGif {
  url: string;
  title: string;
  likes: number;
  tags: string[];
}

const gifSchema = new Schema<IGif>(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model<IGif>('Gif', gifSchema);
