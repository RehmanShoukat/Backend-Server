const mongoose = require("mongoose")
require("dotenv").config()

const {MONGODB_USERNAME , MONGODB_PASSWORD } = process.env



const connectDB = ()=>{
    mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster3.dcougro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3`)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((error)=>{
  console.log("MongoDb are not connected")
  console.error(error)
})
}

module.exports = connectDB