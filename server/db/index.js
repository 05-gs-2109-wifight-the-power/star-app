//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
//order-details
const Order_Details = require("./models/Order_Details");
//product
const Star = require("./models/Star");
//order/cart
const Order = require("./models/Order");

//associations could go here!

Order.belongsTo(User);
User.hasMany(Order);

Star.belongsToMany(Order, { through: Order_Details });
Order.belongsToMany(Star, { through: Order_Details });

//possible double entry? problem or no?
Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(Order_Details);
Order_Details.belongsTo(Order);

Star.hasMany(Order_Details);
Order_Details.belongsTo(Star);

module.exports = {
  db,
  models: {
    User,
    Order_Details,
    Star,
    Order,
  },
};
