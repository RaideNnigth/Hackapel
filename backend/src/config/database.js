import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("[DB] Connection has been established successfully.");
  } catch (error) {
    console.error("[DB] Unable to connect to the database:", error);
    throw error;
  }
}

export default sequelize;