import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";

const request = supertest(app);
let authenToken: string;

describe("users endpoints", () => {
  beforeAll(async () => {
    const user: User = {
      id: 1,
      firstname: "Stephanie",
      lastname: "Connor",
      username: "stephanie",
      password: "stephanie111",
    };

    const response = await request.post("/users").send(user);
    authenToken = response.body;
  });

  it("should require authentication when index users", (done) => {
    request.get("/users").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when show user", (done) => {
    request.get("/users/1").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should create new user without error", (done) => {
    const newUser: User = {
      firstname: "Jane",
      lastname: "Doe",
      username: "janedoe",
      password: "janedoe123",
    };
    request
      .post("/users")
      .send(newUser)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should index users without error", (done) => {
    request
      .get("/users")
      .set("Authorization", `bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should show user without error", (done) => {
    request
      .get("/users/1")
      .set("Authorization", `bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});
