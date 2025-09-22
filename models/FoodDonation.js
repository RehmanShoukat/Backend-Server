const mongoose = require('mongoose');

const FoodDonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  donorEmail: {
    type: String,
    required: true
  },
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // NGO collection
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantity: {
    type: String, // "5 kg", "10 meals", etc
    required: true
  },
  pickupAddress: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoodDonation', FoodDonationSchema);
