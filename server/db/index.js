//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Cart = require("./models/Cart");

// fix
const Star = require("./models/Star");

//associations could go here!

//check spelling of Star...
//quotes or no quotes on cart
User.belongsToMany(Star, { through: Cart });
Star.belongsToMany(User, { through: Cart });

module.exports = {
  db,
  models: {
    User,
    Cart,
    //stars/star?
    Star,
  },
};
