const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/User");
const { verifyToken } = require("../middlewares/auth");
const { getRandomId } = require("../config/global");

require("dotenv").config();

const router = express.Router();
const { JWT_SECRET_KEY } = process.env;

// ================= Register =================
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All fields are required", isError: true });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", isError: true });
    }

    const user = await users.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Email is already in use", isError: true });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const uid = getRandomId();

    // ✅ default role = donor
    const userData = { uid, fullName, email, password: hashPassword, role: "donor" };

    const newUser = new users(userData);
    await newUser.save();

    res.status(201).json({
      message: "A new user has been registered successfully",
      user: {
        uid: newUser.uid,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      isError: false,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong while registering new user" });
  }
});

// ================= Login =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    console.log("user", user);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is invalid", isError: true });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { uid, role } = user;

      // ✅ token me role + uid
      const token = jwt.sign({ uid, role }, JWT_SECRET_KEY, { expiresIn: "1d" });

      res.status(200).json({
        message: "Login Successfully",
        isError: false,
        token,
        role, // ✅ frontend ko role milega
      });
    } else {
      res
        .status(401)
        .json({ message: "Password or email is invalid", isError: true });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Something went wrong while login the user",
      err,
      isError: true,
    });
  }
});

// ================= Get User =================
router.get("/user", verifyToken, async (req, res) => {
  try {
    const { uid } = req; // ✅ middleware se uid aa raha hai
    const user = await users.findOne({ uid }).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", isError: true });
    }
    res.status(200).json({ message: "User Found", isError: false, user });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({
      message: "Something went wrong while getting the user",
      err,
      isError: true,
    });
  }
});

module.exports = router;
