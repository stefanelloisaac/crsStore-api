import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import Category from "./Category";

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER(15, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(300),
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

Product.belongsTo(Category, {
  as: "category",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idCategory",
    field: "id_category",
    allowNull: false,
  },
});

export default Product;
