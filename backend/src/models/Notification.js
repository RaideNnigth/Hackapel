import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    idGercon: {
      type: DataTypes.NUMBER(19),
      unique: true,
      allowNull: true,
    },

    consultType: {
      type: DataTypes.TEXT
    
    },

    startDateTime: {
      type: DataTypes.DATE

    },

    endDateTime: {
      type: DataTypes.DATE
    
    },

    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },

    medicName: {
      type: DataTypes.STRING(255)

    },

    especiality: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false
    },

    scheduleStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false
    },

  },
  {
    tableName: "notifications",
    timestamps: true, // createdAt / updatedAt
  }
);

export default Notification;
