import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: { type: String, default: 'admin' },
}, { timestamps: true });

export const Admin = mongoose.model('Admin', adminSchema);
