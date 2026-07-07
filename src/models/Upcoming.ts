import mongoose, { Schema, Document } from 'mongoose';

export interface IUpcoming {
  brand: string;
  model: string;
  expectedDate: Date;
  leaks: string[];
  confirmedSpecs: Record<string, any>;
  image: string;
}

const UpcomingSchema: Schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  expectedDate: { type: Date },
  leaks: [{ type: String }],
  confirmedSpecs: { type: Schema.Types.Mixed },
  image: { type: String }
}, { timestamps: true });

export default mongoose.models.Upcoming || mongoose.model<IUpcoming>('Upcoming', UpcomingSchema);
