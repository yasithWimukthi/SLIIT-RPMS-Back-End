import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";



import authRoutes from "./routes/auth.js";
import researchGroupRoutes from "./routes/ResearchGropRoutes.js";
import studentRoutes from "./routes/StudentRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import acedemicStaffRoutes from "./routes/AcademicStaffRoutes.js";
import chatRoutes from './routes/ChatRoutes.js';



const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});


app.use("/api/auth", authRoutes);
app.use("/api/researchGroup", researchGroupRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/acedemicStaff", acedemicStaffRoutes);
app.use("/api/chat", chatRoutes);


app.use((error, req, res) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


export default app;