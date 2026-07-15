import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/db/mongodb.js";

connectDB();
const PORT = process.env.PORT || 3000;

console.log("Resume AI Backend Version 2 - Privacy Layer Enabled");

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});