import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("default api should be able to access without error", () => {
  it("should get the default api endpoint with status 200", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("api should be able to access without error", () => {
  it("should get the api endpoint with status 200", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
});
