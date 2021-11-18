const cartRouter = require("express").Router();
module.exports = cartRouter;
//const { addToCart } = require("../../client/store/shopping");
const {
  models: { Star, Order, Order_Details, User },
} = require("../db");

const { requireToken, isAdmin } = require("./gateKeepingMiddleware");
// console.log(Order_Details.prototype);
// requireToken creates a block in the browser but not in Postman.
// should also be isAdmin to view api routes
cartRouter.get("/:userId", async (req, res, next) => {
  try {
    // console.log("userId in /cart/userId", req.params.userId);
    // console.log("req.params", req.user);
    const orders = await Order.findAll({
      where: {
        isBought: false,
        userId: req.params.userId,
        //userId: req.user.id
      },
      include: [
        {
          model: Order_Details,
        },
        { model: Star },
      ],
    });
    console.log(orders.dataValues);
    res.send(orders);
  } catch (e) {
    next(e);
  }
});

// cartRouter.get("/:orderId", requireToken, async (req, res, next) => {
//   // req.user is inherited from requireToken middleware
//   console.log("req.user.id:", req.user.id);
//   try {
//     const order = await Order.findAll({
//       where: {
//         id: req.params.orderId,
//         userId: req.user.id,
//       },
//     });
//     res.send(order);
//   } catch (e) {
//     next(e);
//   }
// });

// isUser() <====
// find one Order in cart by this userId, if there is an order, return that order
// if not, then create an order for this user.
// requireToken,
cartRouter.get("/:userId/:starId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        isBought: false,
      },
      include: [
        {
          model: Order_Details,
        },
      ],
    });

    const star = await Star.findByPk(req.params.starId);

    if (order) {
      await Order_Details.create({
        orderId: order.id,
        starId: req.params.starId,
        quantity: star.quantity,
        totalPrice: star.price,
      });

      res.json(order);
    } else {
      const newOrder = await Order.create({
        userId: req.params.userId,
      });

      await Order_Details.create({
        orderId: newOrder.id,
        starId: req.params.starId,
        quantity: star.quantity,
        totalPrice: star.price,
      });
      res.json(newOrder);
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:orderId to delete from Cart
cartRouter.delete("/:orderId", async (req, res, next) => {
  try {
    const order = await Order_Details.findByPk();
  } catch (e) {
    next(e);
  }
});

// UPDATE /api/cart/:orderId to Update from DATA
cartRouter.put("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    res.json(await order.update(req.body));
  } catch (e) {
    next(e);
  }
});

// // UPDATE /api/cart/:starId to Update from DATA
// cartRouter.put("/update/:starId", async (req, res, next) => {
//   try {
//     const star = await Star.findByPk(req.params.starId);
//     res.json(await star.update(req.body));
//   } catch (e) {
//     next(e);
//   }
// });
