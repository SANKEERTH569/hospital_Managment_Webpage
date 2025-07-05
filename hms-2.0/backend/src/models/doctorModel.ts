import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  qualifications: string[];
  experience: string;
  department: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new Schema<IDoctor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  phone: { 
    type: String, 
    required: true,
    match: [/^[0-9]{10,15}$/, 'Please use a valid phone number']
  },
  specialty: { type: String, required: true },
  qualifications: [{ type: String }],
  experience: { type: String, required: true },
  department: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
doctorSchema.pre<IDoctor>('save', async function(next) {
  if (this.isModified('password')) {
    const bcrypt = await import('bcryptjs');
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = new Date();
  next();
});

// Method to compare password for login
doctorSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
