import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.json({ message: "Hackapel backend is running" });
});

// Health check + PostgreSQL test
app.get("/api/health", async (req, res) => {
  try {
    const now = await testConnection();
    res.json({
      status: "ok",
      database_time: now,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
