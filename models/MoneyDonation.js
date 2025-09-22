const mongoose = require('mongoose');

const moneyDonationSchema = new mongoose.Schema(
  {
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    donorName: { type: String, required: true }, // New field for donor's name
    ngoAccountType: {
      type: String,
      enum: ['EasyPaisa', 'JazzCash', 'Bank', 'Other'],
      required: true
    },
    amount: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MoneyDonation', moneyDonationSchema);
