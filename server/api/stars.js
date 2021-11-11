const starsRouter = require("express").Router();
const {
  models: { Star },
} = require("../db");
const Order_Details = require("../db/models/Order_Details");

module.exports = starsRouter;

// GET /api/stars
starsRouter.get("/", async (req, res, next) => {
  try {
    const stars = await Star.findAll();
    console.log("these are our stars:", stars);
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

// POST /api/stars (admin)
starsRouter.post("/", async (req, res, next) => {
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
  } catch (e) {
    next(e);
  }
});

starsRouter.put("/:starId", async (req, res, next) => {
  try {
    const star = await Star.findByPk(req.params.starId);
    res.json(await star.update(req.body));
  } catch (e) {
    next(e);
  }
});

// DELETE /api/stars/starId
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
