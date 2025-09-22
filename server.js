const express=require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const contactRoutes = require("./routes/AuthRouter")
const foodDonationRoutes = require("./routes/foodDonationRoutes")
const moneyDonationRoutes = require("./routes/moneyDonation")


const corsOption = { origin: "http://localhost:5173", }


app.use(cors(corsOption))
app.use(express.json());


connectDB() ;

app.use("/auth", contactRoutes)
app.use("/donate/food" , foodDonationRoutes)
app.use("/donate/money" , moneyDonationRoutes)


const { PORT = 8000 } = process.env
app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
})