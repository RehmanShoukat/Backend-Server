const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const contactRoutes = require("./routes/AuthRouter");
const foodDonationRoutes = require("./routes/foodDonationRoutes");
const moneyDonationRoutes = require("./routes/moneyDonation");

const corsOption = { origin: "http://localhost:5173" };

app.use(cors(corsOption));
app.use(express.json());

// ✅ Connect MongoDB (serverless friendly)
connectDB();

// ✅ Routes
app.use("/auth", contactRoutes);
app.use("/donate/food", foodDonationRoutes);
app.use("/donate/money", moneyDonationRoutes);

// ⚠️ Don't use app.listen() in Vercel
// Instead export the app
module.exports = app;
