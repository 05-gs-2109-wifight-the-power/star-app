const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart", {
  isBought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});


