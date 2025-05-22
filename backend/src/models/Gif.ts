import { Schema, model } from 'mongoose';

interface IGif {
  url: string;
  title: string;
  likes: number;
  tags: string[];
  createdAt: Date;
}

const gifSchema = new Schema<IGif>({
  url: { type: String, required: true },
  title: { type: String, required: true },
  likes: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const Gif = model<IGif>('Gif', gifSchema);

export default Gif;
