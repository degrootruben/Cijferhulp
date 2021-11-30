const supertest = require("supertest");

const server = supertest.agent("http://localhost:8000/api/auth");

describe("Tests for auth routes", () => {



  describe("GET /logout", () => {
    it("Should return status code 200", async () => {
      const response = await server.get("/logout");
      expect(response.statusCode).toBe(201);
    });
  });
});
