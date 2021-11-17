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

    console.log('userId in /cart/userId', req.params.userId)
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
      ],
    });

    // const currentCart = await Order_Details.findAll({
    //   where: {
    //     orderId: order[0].id,
    //   },
    // });
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
cartRouter.get(
  "/:userId/:starId",
  // requireToken,
  async (req, res, next) => {
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

      if (order) {

        //const star = await Star.findByPk(req.params.starId)
        //await Order_Details.setStar(star)
        await Order_Details.create({
          orderId: order.id,
          starId: req.params.starId
        })

        res.json(order);
      } else {
        const newOrder = await Order.create(
          {
            userId: req.params.userId
          });

        await Order_Details.create({
          orderId: newOrder.id,
          starId: req.params.starId
        })
        res.json(newOrder);
      }
    } catch (err) {
      next(err);
    }
  }
);

// cartRouter.post("/", async (req, res, next) => {
//   try {
//     console.log("inCartRouter.post: req.body.id:", req.body);
//     // This will check if the Order/Cart already exist for this user...

//     // this is currently hard-coded because requireToken always throws an error!
//     const isCurrentCart = await Order.findAll({
//       where: {
//         userId: 6,
//         isBought: false,
//       },
//     });

//     if (isCurrentCart.length === 0) {
//       const order = await Order.create({
//         userId: 6,
//       });

//       const orderDetail = await Order_Details.create({
//         orderId: order.id,
//         starId: req.body.id,
//       });

//       res.send(orderDetail);
//     } else {
//       const newRow = await Order_Details.create({
//         starId: req.body.id,
//         orderId: isCurrentCart[0].id,
//         quantity: 1,
//         // this needs to increment
//         totalPrice: req.body.price,
//       });
//       res.send(newRow);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// still need cartRouter.delete
// cartRouter.put
