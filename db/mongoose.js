const mongoose = require("mongoose");

const connectDB = async () => {
  return mongoose
    .connect(process.env.MONGO_URL)
};

module.exports = { connectDB }
