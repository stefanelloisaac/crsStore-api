import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Order from "./Order";
import Product from "./Product";

const OrderProduct = sequelize.define(
  "orders_products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    priceProducts: {
      field: "price_products",
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Order.belongsToMany(Product, {
  through: OrderProduct,
  as: "products",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idOrder",
    field: "id_order",
    allowNull: false,
  },
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  as: "order",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idProduct",
    field: "id_product",
    allowNull: false,
  },
});

export default OrderProduct;
