const { expect } = require("chai");
const {
  db,
  models: { Star },
} = require("../index");
const jwt = require("jsonwebtoken");
const seed = require("../../../script/seed");
import AllStars, {
  AllStars as UnconnectedAllStars,
} from "../../../client/components/AllStars";
import Routes from "../../../client/Routes";
import React from "react";
import { mount } from "enzyme";
// import mockAxios from "../mock-axios";
import sinon from "sinon";

xdescribe("Star model", () => {
  describe("Sequelize", () => {
    before(() => {
      console.log(`Look at the server/db/Star.js`);
    });
    before(async () => {
      await db.sync({ force: true });
    });
  });

  describe("Basic Fields: name and starType", () => {
    let star = {
      name: "Gissel",
      coordinates: "RA 19h 10m 46s | Dec -21° 59' 35\"",
      bio: "Sagittarius (♐︎) (Greek: Τοξότης Toxótēs, Latin: Sagittarius) is the ninth astrological sign, which is associated with the constellation Sagittarius and spans 240–270th degrees of the zodiac.",
      constellation: "Sagittarius",
      price: 9999,
      imageUrl:
        "https://media.istockphoto.com/vectors/sagittarius-constellation-vector-id525430193?k=20&m=525430193&s=612x612&w=0&h=oI96xEI2O3R_c2x9rkAgzZ87dZVMyndYczZ_ePjQYdg=",
      isAvaillable: true,
      userStarName: "Unclaimed",
      distanceFromEarth: 510,
      quantity: 1,
    };
    it("name is a string", async () => {
      const albaldah = await Star.create({
        name: "Gissel",
        constellation: "Cancer",
      });
      expect(albaldah.name).to.equal(
        "Gissel",
        "Was not able to create a star with name Gissel"
      );
    });

    it("name cannot be null", async () => {
      try {
        const emptyNameStar = Star.build({ name: "" });
        const validation = await emptyNameStar.validate();
        console.log("Validation failed");
      } catch (e) {
        console.log("Error on line 40 Star.specs on db");
      }
    });

    it("Needs fields name, constellation, price", async () => {
      try {
        star.notRealAttribute = "does not compute";
        const savedStar = await Star.create(star);
        expect(savedStar.name).to.equal("Gissel");
        expect(savedStar.constellation).to.equal("Sagittarius");
        expect(savedStar.distanceFromEarth).to.equal(510);
        expect(savedStar.notRealAttribute).to.equal(undefined);
      } catch (e) {
        expect(e.message).to.contain("Needs fields name, constellation, price");
      }
    });
  }); // end describe("Basic Fields: name and starType")
}); // end describe('Star model')
