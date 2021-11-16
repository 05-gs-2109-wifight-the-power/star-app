const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Star },
} = require("../db");
const seed = require("../../script/seed");
const app = require("../app");

xdescribe("Star routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("/api/stars/", () => {
    it("GET /api/stars", async () => {
      const res = await request(app).get("/api/stars").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(33);
    });
  }); // end describe('/api/stars')
}); // end describe('Star routes')
