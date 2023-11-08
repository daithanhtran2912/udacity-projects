import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";
import { Product } from "../../models/product";

const request = supertest(app);
let authenToken: string;

describe("products endpoints", () => {
  beforeAll(async () => {
    const user: User = {
      id: 1,
      firstname: "Eric",
      lastname: "Buckland",
      username: "buckland",
      password: "buckland222",
    };

    const response = await request.post("/users").send(user);
    authenToken = response.body;
  });

  it("should require authentication when create product", (done) => {
    request.post("/products").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should create new product without error", (done) => {
    const newProduct: Product = {
      name: "Cotton Candy",
      price: "1.49",
      category_id: 2,
    };
    request
      .post("/products")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(newProduct)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should index products without error", (done) => {
    request.get("/products").then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  it("should show product without error", (done) => {
    request.get("/products/1").then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  it("should find product by category without error", (done) => {
    request.get("/products/categories/2").then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  it("should find top five most popular products without error", (done) => {
    request.get("/most-popular").then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
