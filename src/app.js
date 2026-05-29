import express from "express";
import cors from "cors"
const app=express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials:true
}));

app.use(express.json());

/*All routes here */
import authRouter from "./routes/auth.routes.js";


/*using all the routes here */
app.use('/api/auth',authRouter);

export default app;