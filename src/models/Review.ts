import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  phoneId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  phoneId: { type: Schema.Types.ObjectId, ref: 'Phone', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  body: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
