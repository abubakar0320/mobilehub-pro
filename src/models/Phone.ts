import mongoose, { Schema, Document } from 'mongoose';

export interface IPhone extends Document {
  // ── NAME FIELDS ──────────────────────────────────
  name: string;           // "Samsung Galaxy A55 5G"
  shortName: string;      // "Galaxy A55"
  brand: string;          // "Samsung"
  series: string;         // "Galaxy A"
  modelNumber: string;    // "SM-A556B"
  slug: string;           // "samsung-galaxy-a55-5g"
  searchAliases: string[]; // ["A55","a55","galaxy a55","samsng a55","a 55"]

  // ── IMAGE FIELDS ─────────────────────────────────
  images: {
    main: string;          // Cloudinary URL — front view
    back: string;          // back view
    side: string;          // side/angle view
    thumbnail: string;     // small square crop (for cards)
    colors: Map<string, string>; // "Iceblue" → Cloudinary URL
    gallery: string[];     // extra lifestyle/closeup shots
  };
  colorOptions: string[];  // ["Awesome Iceblue", "Awesome Navy", "Awesome Lilac"]

  // ── EXISTING SPEC FIELDS ─────────────────────────
  launchDate: Date;
  price: {
    USD?: number;
    EUR?: number;
    INR?: number;
  };
  display: {
    size?: string;
    resolution?: string;
    type?: string;
    refreshRate?: string;
  };
  camera: {
    main?: string[];
    front?: string[];
    features?: string[];
  };
  battery: {
    capacity?: string;
    charging?: string;
  };
  processor: {
    chipset?: string;
    cpu?: string;
    gpu?: string;
  };
  rating: number;
  pros: string[];
  cons: string[];
}

const PhoneSchema: Schema = new Schema<IPhone>({
  name:          { type: String, required: true, trim: true },
  shortName:     { type: String, required: true, trim: true },
  brand:         { type: String, required: true, index: true },
  series:        { type: String, default: '' },
  modelNumber:   { type: String, default: '' },
  slug:          { type: String, required: true, unique: true },
  searchAliases: { type: [String], default: [] },

  images: {
    main:      { type: String, default: '' },
    back:      { type: String, default: '' },
    side:      { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    colors:    { type: Map, of: String, default: {} },
    gallery:   { type: [String], default: [] },
  },
  colorOptions: { type: [String], default: [] },
  
  launchDate: { type: Date },
  price: {
    USD: { type: Number },
    EUR: { type: Number },
    INR: { type: Number }
  },
  display: {
    size: { type: String },
    resolution: { type: String },
    type: { type: String },
    refreshRate: { type: String }
  },
  camera: {
    main: [{ type: String }],
    front: [{ type: String }],
    features: [{ type: String }]
  },
  battery: {
    capacity: { type: String },
    charging: { type: String }
  },
  processor: {
    chipset: { type: String },
    cpu: { type: String },
    gpu: { type: String }
  },
  rating: { type: Number, default: 0 },
  pros: [{ type: String }],
  cons: [{ type: String }]
}, { timestamps: true });

// Auto-generate slug from name
PhoneSchema.pre('save', function(this: IPhone, next: any) {
  if (this.isModified('name') && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

export default mongoose.models.Phone || mongoose.model<IPhone>('Phone', PhoneSchema);
