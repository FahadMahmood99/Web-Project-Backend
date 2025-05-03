const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123', // Will be hashed automatically
    role: 'admin',
  });
  console.log('Admin created:', admin);
};

createAdmin().catch(console.error);