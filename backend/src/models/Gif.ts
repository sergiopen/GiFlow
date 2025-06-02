import { Schema, model, Types } from 'mongoose';

export interface IGif {
  url: string;
  title: string;
  likes: number;
  tags: string[];
  likedBy: Types.ObjectId[];
  views: number;
  uploadedBy: Types.ObjectId;
}

const gifSchema = new Schema<IGif>(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    views: { type: Number, default: 0 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default model<IGif>('Gif', gifSchema);
