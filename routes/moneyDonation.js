const express = require("express");
const router = express.Router();
const MoneyDonation = require("../models/MoneyDonation");
const { verifyToken } = require("../middlewares/auth");

const DEFAULT_NGO_ID = "hwhvnog4o4719t4vucyxba";

// DONOR - Create Money Donation
router.post("/donate", verifyToken, async (req, res) => {
  try {
    // Only donors can donate
    if (req.role !== "donor") {
      return res.status(403).json({ message: "Only donors can donate money" });
    }

    const { donorName, amount, ngoAccountType, notes } = req.body;
    if (!donorName || !amount || !ngoAccountType) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const donation = new MoneyDonation({
      donorId: req.uid,
      donorName,
      ngoAccountType,
      amount,
      notes
    });

    await donation.save();
    res.status(201).json({ message: "Money donation submitted successfully", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// NGO - Get all money donations
router.get("/all", verifyToken, async (req, res) => {
  try {
    if (req.role !== "ngo") {
      return res.status(403).json({ message: "Access denied" });
    }

    const donations = await MoneyDonation.find({ ngoId: DEFAULT_NGO_ID })
      .populate("donorId", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ donations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
