const cartRouter = require("express").Router()
module.exports = cartRouter;
const {
  models: {Star, Order, Order_Details, User}
} = require ("../db");

const { requireToken, isAdmin } = require("./gateKeepingMiddleware");


// requireToken creates a block in the browser but not in Postman.
// should also be isAdmin to view api routes
cartRouter.get ("/", requireToken, async (req, res, next) => {
  try {
    console.log('req.params', req.user)
    const order = await Order.findAll({
      where : {
        isBought: false,
        userId: req.user.id
        //userId: 3
      }
    })

    const currentCart = await Order_Details.findAll({
      where: {
        orderId: order[0].id,
      }
    })
    res.send(currentCart)
  } catch (e) {
    next(e)
  }
})

cartRouter.get("/:orderId", requireToken, async (req, res, next) => {

  // req.user is inherited from requireToken middleware
  console.log('req.user.id:', req.user.id)
  try {
    const order = await Order.findAll({
      where : {
        id: req.params.orderId,
        userId: req.user.id
      }
    })
    res.send(order)
  } catch (e) {
    next(e)
  }
})


cartRouter.post("/", async (req, res, next) => {
  try {

    console.log('inCartRouter.post: req.body.id:', req.body)
    // This will check if the Order/Cart already exist for this user...

    // this is currently hard-coded because requireToken always throws an error!
    const isCurrentCart = await Order.findAll({
      where: {
        userId: 6,
        isBought: false
      }
    })

    if(isCurrentCart.length === 0) {
      const order = await Order.create({
        userId: 6
      })

      const orderDetail = await Order_Details.create({
        orderId: order.id,
        starId: req.body.id
      })

    res.send(orderDetail)
    } else {

      const newRow = await Order_Details.create({
        starId: req.body.id,
        orderId: isCurrentCart[0].id,
        quantity: 1,
        // this needs to increment
        totalPrice: req.body.price
      })
      res.send(newRow)
    }
  } catch (e) {
    next(e);
  }
});


// still need cartRouter.delete
// cartRouter.put
