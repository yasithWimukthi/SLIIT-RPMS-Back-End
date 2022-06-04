import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const conn = mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

export default conn;