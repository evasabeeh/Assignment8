const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    await mongoose
        .connect(process.env.MONGO_URI)                       // database url
        .then(() => console.log("Database is connected"))
        .catch((e) => console.log(e));
};

module.exports = connectDB;


