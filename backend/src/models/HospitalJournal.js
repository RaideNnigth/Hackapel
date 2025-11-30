import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const HospitalJournal = sequelize.define(
  "HospitalJournal",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    prestador: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    especialidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    horario: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    nome_profissional: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "HospitalJournal",
    timestamps: true,
  }
);

export default HospitalJournal;
