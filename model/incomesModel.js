const mongoose = require('mongoose');

const incomesSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Please add a text value'],
    },

    ammount: {
      type: Number,
      required: [true, 'Please add a number value'],
    },

    name: {
      type: String,
      required: [false, 'Please add a text value'],
    },

    month: {
      type: String,
      required: [true, 'Please add a text value'],
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Income', incomesSchema);
