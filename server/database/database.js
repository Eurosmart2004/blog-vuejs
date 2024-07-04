const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database successfully!");
    return connection;
  } catch (err) {
    console.log("Error connecting to database: ", err);
    throw new Error(err);
  }
}

module.exports = { connect };
