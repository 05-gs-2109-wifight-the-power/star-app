"use strict";

// new addition for star JSON data
const fs = require("fs");

const {
  db,
  models: { User, Star, Order_Details, Order },
} = require("../server/db");

// adding data
const stars = JSON.parse(fs.readFileSync("star-data.json"));

const userDummies = JSON.parse(fs.readFileSync("user-dummy-data.json"));

const orderDummies = JSON.parse(fs.readFileSync("order-dummy-data.json"));

const orderDetailsDummies = JSON.parse(
  fs.readFileSync("order-details-dummy-data.json")
);

//console.log("User Dummies on Seed.js", userDummies);
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", isAdmin: true }),
    User.create({ username: "murphy", password: "123", isAdmin: false }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  const starData = await Promise.all(
    stars.map((star) =>
      Star.create({
        name: star.name,
        coordinates: star.coordinates,
        bio: star.bio,
        constellation: star.constellation,
        price: star.price,
        imageUrl: star.imageUrl,
        isAvailable: star.isAvailable,
        userStarName: star.userStarName,
        distanceFromEarth: star.distanceFromEarth,
        quantity: star.quantity,
      })
    )
  );

  const userData = await Promise.all(
    userDummies.map((user) =>
      User.create({
        username: user.username,
        password: user.password,
        isAdmin: user.isAdmin,
      })
    )
  );

  const orderData = await Promise.all(
    orderDummies.map((order) =>
      Order.create({
        userId: order.userId,
        isBought: order.isBought,
      })
    )
  );

  const orderDetailsData = await Promise.all(
    orderDetailsDummies.map((order) =>
      Order_Details.create({
        isFavorite: order.isFavorite,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        starId: order.starId,
        orderId: order.orderId,
      })
    )
  );
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    starData,
    userData,
    orderData,
    orderDetailsData,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
