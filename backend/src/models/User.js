import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Is used for most users beside UBS and Hospital/Lab
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: true,
        len: [11, 11],
      },
    },

    // Is used for UBS and Hospital/Lab users
    cnes: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        validate: {
          isNumeric: true,
        },
    },

    // Cartão Nacional de Saúde
    cns: {
      type: DataTypes.STRING(15),
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [15, 15],
      },
    },

    // --- TELEFONE ---
    phone_number: {
      type: DataTypes.STRING(20), // inclui DDI + DDD + número
      allowNull: true,
      validate: { is: /^[0-9+()-\s]{8,20}$/i },
    },

    // --- ENDEREÇO ESTRUTURADO ---
    address_street: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_neighborhood: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_state: {
      type: DataTypes.STRING(2),
      allowNull: true,
      validate: { len: [2, 2] }, // UF: RS, SC, SP, RJ...
    },

    address_zipcode: {
      type: DataTypes.STRING(8),
      allowNull: true,
      validate: { isNumeric: true, len: [8, 8] },
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "UBS", "PACIENTE", "OFICIAL ADMINISTRATIVO", "HOSPITAL/LAB"),
      allowNull: false,
      defaultValue: "PACIENTE",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: true, // createdAt / updatedAt
  }
);

export default User;
