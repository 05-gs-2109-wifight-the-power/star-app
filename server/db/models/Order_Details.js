const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("Order_Details", {
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
});
