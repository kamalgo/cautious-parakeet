const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const MahadbtCashSubscriptions = sequelize.define("cash_subscriptions", {
  subscriptionId: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  subReferenceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  planId: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  planName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  maxCycles: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  maxAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  customerName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  customerEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  mode: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  cardNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  firstChargeDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  addedOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  scheduledOn: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  currentCycle: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  authLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tpvEnabled: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
//   tableName: "cash_subscriptions",
//   schema: "mahadbt",
  timestamps: false, // Assuming there are no createdAt/updatedAt fields
});

module.exports = MahadbtCashSubscriptions;
