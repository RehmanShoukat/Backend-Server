// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const FoodDonation = require('../models/FoodDonation');

// // Replace this with a valid 24-character ObjectId from your MongoDB NGO
// const DEFAULT_NGO_ID = new mongoose.Types.ObjectId('650f8a2d4c3e2f7a9b1c1234');

// // DONOR - Create Food Donation
// router.post('/donate', async (req, res) => {
//   try {
//     const { donorName, donorEmail, foodType, quantity, pickupAddress, notes } = req.body;

//     if (!donorName || !donorEmail || !foodType || !quantity || !pickupAddress) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     const donation = new FoodDonation({
//       donorName,
//       donorEmail,
//       ngoId: DEFAULT_NGO_ID,
//       foodType,
//       quantity,
//       pickupAddress,
//       notes
//     });

//     await donation.save();
//     res.status(201).json({ message: 'Food donation submitted successfully', donation });
//   } catch (err) {
//     console.error("Error saving donation:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /all - NGO dashboard view
// router.get('/all', async (req, res) => {
//   try {
//     const donations = await FoodDonation.find({ ngoId: DEFAULT_NGO_ID })
//       .sort({ createdAt: -1 });

//     res.status(200).json({ donations });
//   } catch (err) {
//     console.error("Error fetching donations:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const FoodDonation = require('../models/FoodDonation');

// const DEFAULT_NGO_ID = new mongoose.Types.ObjectId('650f8a2d4c3e2f7a9b1c1234');

// // ================== Donate Food ==================
// router.post('/donate', async (req, res) => {
//   try {
//     const { donorName, donorEmail, foodType, quantity, pickupAddress, notes } = req.body;

//     if (!donorName || !donorEmail || !foodType || !quantity || !pickupAddress) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     const donation = new FoodDonation({
//       donorName,
//       donorEmail,
//       ngoId: DEFAULT_NGO_ID,
//       foodType,
//       quantity,
//       pickupAddress,
//       notes
//     });

//     await donation.save();
//     res.status(201).json({ message: 'Food donation submitted successfully', donation });
//   } catch (err) {
//     console.error("Error saving donation:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================== Donor History ==================
// router.get('/history', async (req, res) => {
//   try {
//     const { donorEmail } = req.query;
//     if (!donorEmail) return res.status(400).json({ message: 'donorEmail is required' });

//     const donations = await FoodDonation.find({ donorEmail }).sort({ createdAt: -1 });
//     res.status(200).json({ message: 'Donation history fetched', donations });
//   } catch (err) {
//     console.error("Error fetching donation history:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ================== All donations for NGO ==================
// router.get('/all', async (req, res) => {
//   try {
//     const donations = await FoodDonation.find({ ngoId: DEFAULT_NGO_ID }).sort({ createdAt: -1 });
//     res.status(200).json({ donations });
//   } catch (err) {
//     console.error("Error fetching donations:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FoodDonation = require('../models/FoodDonation');

const DEFAULT_NGO_ID = new mongoose.Types.ObjectId('650f8a2d4c3e2f7a9b1c1234');

// Donate food
router.post('/donate', async (req, res) => {
  try {
    const { donorName, donorEmail, foodType, quantity, pickupAddress, notes } = req.body;

    if (!donorName || !donorEmail || !foodType || !quantity || !pickupAddress) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const donation = new FoodDonation({
      donorName,
      donorEmail,
      ngoId: DEFAULT_NGO_ID,
      foodType,
      quantity,
      pickupAddress,
      notes
    });

    await donation.save();
    res.status(201).json({ message: 'Food donation submitted successfully', donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Donor history
router.get('/history', async (req, res) => {
  try {
    const { donorEmail } = req.query;

    if (!donorEmail) return res.status(400).json({ message: 'donorEmail is required' });

    // Get donations by donorEmail
    const donations = await FoodDonation.find({ donorEmail }).sort({ createdAt: -1 });
    res.status(200).json({ donations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
