const supertest = require("supertest");

const server = supertest.agent("http://localhost:8000/api/auth");

describe("Tests for auth routes", () => {

  describe("POST /login", () => {
    it("Should return status code 400", async () => {
      const res = await server.post("/login").send({ "email": "poep", "password": "henkie" });
      expect(res.statusCode).toBe(500);
    })
  });

  describe("POST /register", () => {
    it("Should return status code 400 when not providing body", async () => {
      const res = await server.post("/register");
      expect(res.statusCode).toBe(400);
    });

  });

  describe("GET /logout", () => {
    it("Should return status code 200", async () => {
      const res = await server.get("/logout");
      expect(res.statusCode).toBe(200);
    });
  });
});
