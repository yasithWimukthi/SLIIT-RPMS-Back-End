import dotenv from "dotenv";
import app from "./app.js"
import conn from './db.js'
dotenv.config();


app.listen(process.env.PORT || 8000);
