import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import User from "./User";

const Address = sequelize.define(
  "adresses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    zip_code: {
      field: "zip_code",
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numberForget: {
      field: "number_forget",
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Address.belongsTo(User, {
  as: "user",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idUser",
    field: "id_user",
    allowNull: false,
  },
});

export default Address;
