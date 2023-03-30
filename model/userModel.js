const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add name'],
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    incomes: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
    },
    expenses: {
      type: String,
    },
    budget: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
