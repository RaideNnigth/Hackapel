import express from "express";
import cron from "node-cron";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import notificationRotes from "./routes/notificationRoutes.js"
import postToSendRoutes from "./routes/postToSendRoutes.js";
import telegramRoutes from './routes/telegramRoutes.js';
import webPushRoutes from "./routes/webPushRoutes.js";
import HospitalJournalRoutes from "./routes/hospitalJournalRoutes.js";
import { testConnection } from "./config/database.js";
import sequelize from "./config/database.js";


import { syncPelotasInformesToPosts } from "./jobs/pelotasInformesSync.js";
import { runNotificationDispatchJob  } from "./jobs/notificationDispatchJob.js";

import "./models/User.js";
import "./models/WebPushSubscription.js";

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
app.use("/api/notification", notificationRotes);
app.use("/api/posts-to-send", postToSendRoutes);
app.use("/api/telegram", telegramRoutes);
app.use("/api/webpush", webPushRoutes);
app.use("/api/hospital-journals", HospitalJournalRoutes);

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

// ⏰ Run Pelotas scraper every 3 minutes
cron.schedule("*/3 * * * *", async () => {
  console.log("[CRON] Running Pelotas Informes sync job...");

  try {
    const result = await syncPelotasInformesToPosts();
    console.log("[CRON] Pelotas sync completed:", result);
  } catch (error) {
    console.error("[CRON] Error running syncPelotasInformes:", error);
  }
});

// ⏰ Run Notification sender every 3 minutes
cron.schedule("*/3 * * * *", async () => {
  console.log("[CRON] Running Notification Sender job...");

  try {
    const result = await runNotificationDispatchJob ();
    console.log("[CRON] Notification dispatch completed:", result);
  } catch (error) {
    console.error("[CRON] Error running notificationDispatchJob:", error);
  }
});
  