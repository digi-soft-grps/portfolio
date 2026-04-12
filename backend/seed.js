import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Admin } from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const setValue = process.env.SET_VALUE;

    if (setValue !== 'true') {
      console.error('Error: SET_VALUE is not true in your .env file. Seed script execution blocked.');
      process.exit(1);
    }

    if (!adminEmail || !adminPassword) {
      console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD must be provided in .env');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`Admin account credentials for ${adminEmail} updated successfully.`);
      process.exit(0);
    }

    // Create the admin user
    const newAdmin = new Admin({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();
    console.log(`Successfully seeded admin account: ${adminEmail}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin account:', error);
    process.exit(1);
  }
};

seedAdmin();
