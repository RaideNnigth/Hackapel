import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PostToSend = sequelize.define(
  "PostToSend",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    postTitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    postDescription: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    postBody: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Base64 encoded images
    postImages: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      comment: "Array of Base64 encoded image strings",
    },

    // informative | AdminPost
    typeOfPost: {
      type: DataTypes.ENUM("informative", "AdminPost"),
      allowNull: false,
      defaultValue: "informative",
    },
  },
  {
    tableName: "posts_to_send",
    timestamps: true, // createdAt, updatedAt
  }
);

export default PostToSend;
