import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();
import dotenv from "dotenv";
dotenv.config();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/*All routes here */
import authRouter from "./routes/auth.routes.js";


/*using all the routes here */
app.use('/api/auth',authRouter);

/* Error handling middleware */
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;