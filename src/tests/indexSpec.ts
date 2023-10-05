import supertest from "supertest";
import app from "../index";

const request = supertest(app);
it("should get the api endpoint with status 200", async () => {
  const response = await request.get("/api");
  expect(response.status).toBe(200);
});
