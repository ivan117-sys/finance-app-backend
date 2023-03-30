const mongoose = require('mongoose');

const expensesSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'please add an type'],
    },
    ammount: {
      type: Number,
      required: [true, 'please add an number'],
    },
    month: {
      type: String,
      required: [true, 'please add a month'],
    },

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expenses', expensesSchema);
