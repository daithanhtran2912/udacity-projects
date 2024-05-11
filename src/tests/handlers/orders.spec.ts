import supertest from "supertest";
import app from "../../server";
import { User } from "../../models/user";
import { Product } from "../../models/product";
import { Order, ProductOrder } from "../../models/order";

const request = supertest(app);
let authenToken: string;

describe("orders endpoints", () => {
  beforeAll(async () => {
    const user: User = {
      id: 1,
      firstname: "Simon",
      lastname: "Jackson",
      username: "sjackson",
      password: "sjackson333",
    };

    const response = await request.post("/users").send(user);
    authenToken = response.body;

    const newProduct: Product = {
      id: 1,
      name: "Sherlock Holmes",
      price: "49.99",
      category_id: 4,
    };
    await request.post("/products").set("Authorization", `Bearer ${authenToken}`).send(newProduct);
  });

  it("should require authentication when index orders", (done) => {
    request.get("/orders").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when show order", (done) => {
    request.get("/orders/1").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when find orders by user", (done) => {
    request.get("/orders/users/1").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when find completed orders by user", (done) => {
    request.get("/orders/users/1/completed").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when create order", (done) => {
    request.post("/orders").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when completed order", (done) => {
    request.put("/orders/1").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when add a product to order", (done) => {
    request.post("/orders/1/products").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when update a product of order", (done) => {
    request.put("/orders/1/products/1").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when delete a product from an order", (done) => {
    request.delete("/orders/1/products/1").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should require authentication when delete an order", (done) => {
    request.delete("/orders/:id").then((response) => {
      expect(response.status).toEqual(401);
      done();
    });
  });

  it("should create order without error", (done) => {
    const order: Order = {
      id: 1,
      user_id: 1,
      status: false,
    };
    request
      .post("/orders")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(order)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should index orders without error", (done) => {
    request
      .get("/orders")
      .set("Authorization", `Bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should show order without error", (done) => {
    request
      .get("/orders/1")
      .set("Authorization", `Bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should find orders by user without error", (done) => {
    request
      .get("/orders/users/1")
      .set("Authorization", `Bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should find completed orders by user without error", (done) => {
    request
      .get("/orders/users/1/completed")
      .set("Authorization", `Bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should complete an order without error", (done) => {
    const order: Order = {
      id: 1,
      user_id: 1,
      status: false,
    };
    request
      .put("/orders/1")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(order)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should add a product to an order without error", (done) => {
    const productOrder: ProductOrder = {
      id: 1,
      product_id: 1,
      quantity: 5,
    };
    request
      .post("/orders/1/products")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(productOrder)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should update a product of an order without error", (done) => {
    const productOrder: ProductOrder = {
      id: 1,
      product_id: 1,
      quantity: 10,
    };
    request
      .put("/orders/1/products/1")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(productOrder)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should remove a product from an order without error", async (done) => {
    const order: Order = {
      id: 2,
      user_id: 1,
      status: false,
    };
    const { body: newOrder } = await request
      .post("/orders")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(order);
    const newProductOrder: ProductOrder = {
      id: newOrder.id,
      product_id: 1,
      quantity: 1,
    };
    request
      .delete(`/orders/${newOrder.id}/products/${newProductOrder.id}`)
      .set("Authorization", `Bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });

  it("should remove an order without error", async (done) => {
    const order: Order = {
      id: 3,
      user_id: 1,
      status: false,
    };
    const { body: newOrder } = await request
      .post("/orders")
      .set("Authorization", `Bearer ${authenToken}`)
      .send(order);
    request
      .delete(`/orders/${newOrder.id}`)
      .set("Authorization", `Bearer ${authenToken}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});
