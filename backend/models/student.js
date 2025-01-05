import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return (
            v <= new Date() &&
            v >=
              new Date(new Date().setFullYear(new Date().getFullYear() - 100))
          );
        },
        message: 'Invalid date of birth',
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.dateOfBirth = ret.dateOfBirth.toISOString().split('T')[0];
        return ret;
      },
    },
  }
);

export default mongoose.model('Student', studentSchema);
