import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@ecommerce.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      role: 'admin',
      address: 'Admin Address',
      phone: '1234567890'
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@ecommerce.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedAdmin();
