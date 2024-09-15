import express from "express"
import cors from "cors"
import dotenv from "dotenv";
dotenv.config();
import './db.js'; // Import the DB connection
const app = express();

app.use(express.json())
app.use(cors())
// Database connection

export default app;