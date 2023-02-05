const mongoose = require("mongoose");

const url =
  "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";

const connectDB = () => {
  mongoose.connect(url, () => {
    console.log("Connected Sucessfully to mongo");
  });
};

module.exports = connectDB;
