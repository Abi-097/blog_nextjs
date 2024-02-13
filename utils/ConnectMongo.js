// const mongoose = require("mongoose");
import mongoose from "mongoose";
const connectMongo = async () => mongoose.connect(process.env.MONGO_URL);

export default connectMongo;
