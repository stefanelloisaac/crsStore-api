import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Address from "./Address";
import Cupom from "./Cupom";
import Payment from "./Payment";
import User from "./User";

const Order = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "criado",
    },
    total: {
      type: DataTypes.FLOAT,
    },
    totalDiscount: {
      field: "total_discount",
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Order.belongsTo(User, {
  as: "userCostumer",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idUserCostumer",
    allowNull: false,
    field: "id_user_costumer",
  },
});

Order.belongsTo(User, {
  as: "userDeliver",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idUserDeliver",
    allowNull: true,
    field: "id_user_deliver",
  },
});

Order.belongsTo(Address, {
  as: "address",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idAddress",
    field: "id_address",
    allowNull: true,
  },
});

Order.belongsTo(Payment, {
  as: "payment",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idPayment",
    field: "id_payment",
    allowNull: false,
  },
});

Order.belongsTo(Cupom, {
  as: "cupom",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idCupom",
    field: "id_cupom",
    allowNull: true,
  },
});

export default Order;
