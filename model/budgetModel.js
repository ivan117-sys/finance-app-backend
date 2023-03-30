const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
  {
    ammount: {
      type: Number,
      required: [true, 'please add an number value'],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', budgetSchema);
