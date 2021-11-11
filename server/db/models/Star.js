const Sequelize = require("sequelize");
const db = require("../db");

const Star = db.define("star", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  coordinates: {
    type: Sequelize.STRING,
    defaultValue: "No Coordinates at this time.",
  },
  bio: {
    type: Sequelize.TEXT,
    defaultValue: "No description at this time.",
  },
  constellation: {
    type: Sequelize.ENUM(
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces"
    ),
    allowNull: false,
    defaultValue: "Aquarius",
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 1000,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.pinimg.com/736x/07/a4/bc/07a4bc564dbedc540af1216093df9cb5.jpg",
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  userStarName: {
    type: Sequelize.STRING,
    defaultValue: "Unclaimed",
  },
  distanceFromEarth: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Star;
