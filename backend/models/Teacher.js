const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10,}$/, 'Phone number must be at least 10 digits'],
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      match: [/^[a-zA-Z\s]+$/, 'Subject can only contain letters and spaces'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Teacher', TeacherSchema);
