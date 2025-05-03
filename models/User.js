const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator'); // For email/phone validation

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Hide password in query results
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Restrict to these values
      default: 'user', // New users are regular users by default
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      validate: {
        validator: function (v) {
          return /^\+?[0-9\s\-\(\)]{10,20}$/.test(v); // Basic phone validation
        },
        message: 'Please provide a valid phone number',
      },
    },
    is_onboarded: {
      type: Boolean,
      default: false, // Defaults to false until onboarding completes
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

// Automatically generate `id` (alternative to `_id`)
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
UserSchema.set('toJSON', { virtuals: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12); // 12 = salt rounds
  next();
});

// Method to compare passwords (for login)
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);