import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  category: string;
  content: string;
  thumbnail: string;
  author: mongoose.Types.ObjectId;
  publishedAt: Date;
}

const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Mobile Launches', 'Android News', 'Apple News', 'Samsung News', 'AI Technology', 'Software Updates'],
    required: true
  },
  content: { type: String, required: true },
  thumbnail: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
