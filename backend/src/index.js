import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { testConnection } from "./config/database.js";
import sequelize from "./config/database.js";
import "./models/User.js"; // garante que o model é registrado

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hackapel backend is running" });
});

app.get("/api/health", async (req, res) => {
  try {
    await testConnection();
    res.json({
      status: "ok",
      message: "Connected to PostgreSQL via Sequelize",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

// MVC routes
app.use("/api/auth", authRoutes);

// Start server after DB sync
async function start() {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    console.log("All models synchronized");
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

start();
