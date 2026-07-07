import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  slug: string;
  logo: string;
  country: string;
  overview: string;
  website: string;
  totalPhones: number;
}

const BrandSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String },
  country: { type: String },
  overview: { type: String },
  website: { type: String },
  totalPhones: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema);
