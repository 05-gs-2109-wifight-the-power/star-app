const starsRouter = require("express").Router();
const {
  models: { Star, Order, Order_Details, User },
} = require("../db");
// const Order = require("../db/models/Order");
// const Order_Details = require("../db/models/Order_Details");
const { requireToken, isAdmin } = require("./gateKeepingMiddleware");

module.exports = starsRouter;

// GET /api/stars
starsRouter.get("/", async (req, res, next) => {
  try {
    const stars = await Star.findAll();
    // console.log(User.prototype.addOrder(1));

    // console.log("these are our stars:", stars);
    res.json(stars);
  } catch (e) {
    next(e);
  }
});

//GET /api/stars/starId
starsRouter.get("/:starId", async (req, res, next) => {
  try {
    const star = await Star.findByPk(req.params.starId);
    console.log(star);
    res.json(star);
  } catch (e) {
    next(e);
  }
});

// GET /api/stars/orders/:orderId
starsRouter.get("/orders/:orderId", requireToken, async (req, res, next) => {
  try {
    const orders = await Order_Details.findAll({
      where: { orderId: req.params.orderId },
      include: [{ model: Star }],
    });
  } catch (e) {
    next(e);
  }
});

// POST for add to Cart /api/stars/orders
starsRouter.post("/orders", requireToken, async (req, res, next) => {
  try {
    // This will check if the Order/Cart already exist for this user...
    const check = await Order.findAll({ where: { userId: req.body.userId } });
    // If the order/cart doesnt exist, then will create one for the user.
    if (!check) {
      // const cart = await User.addOrder(req.body.userId);
      const cart = await Order.create({
        userId: req.body.userId,
      });
      const order = await Order_Details.create({
        orderId: cart.id,
        starId: Number(req.body.star.id),
        totalPrice: Number(req.body.star.price),
        isFavorite,
      });
      // Else, will update the Order_Details by its
    } else {
      const order = await Order_Details.create({
        orderId: check.id,
        starId: Number(req.body.star.id),
        totalPrice: Number(req.body.star.price),
        isFavorite,
      });
    }
  } catch (e) {
    next(e);
  }
});

// POST /api/stars (admin)
starsRouter.post("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const star = await Star.create({
      name: req.body.name,
      coordinates: req.body.coordinates,
      bio: req.body.bio,
      constellation: req.body.constellation,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      distanceFromEarth: req.body.distanceFromEarth,
    });
    res.json(star);
  } catch (e) {
    next(e);
  }
});

// UPDATE /api/stars/:starId
starsRouter.put("/:starId", async (req, res, next) => {
  try {
    const star = await Star.findByPk(req.params.starId);
    res.json(await star.update(req.body));
  } catch (e) {
    next(e);
  }
});

// DELETE /api/stars/:starId
starsRouter.delete("/:starId", async (req, res, next) => {
  try {
    const star = await Star.findByPk(req.params.starId);
    await star.destroy();
    res.json(star);
  } catch (e) {
    next(e);
  }
});

starsRouter.delete("/cart/:starId", async (req, res, next) => {
  try {
    const star = await Order_Details.findOne({
      where: {
        starId: Number(req.params.starId),
      },
    });
    await star.destroy();
    res.json(star);
  } catch (e) {
    next(e);
  }
});
