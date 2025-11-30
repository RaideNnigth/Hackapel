import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const WebPushSubscription = sequelize.define(
  "WebPushSubscription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    endpoint: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },

    expirationTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "expiration_time",
    },

    // Keys do pushSubscription.keys
    p256dh: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    auth: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "web_push_subscriptions",
    timestamps: true,
  }
);

// Relacionar com User (1:N)
WebPushSubscription.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(WebPushSubscription, {
  foreignKey: "userId",
  as: "webPushSubscriptions",
});

export default WebPushSubscription;
