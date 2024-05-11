import { Order, ProductOrder, ProductsOrders } from "../../models/order";
import Client from "../../database";
import { User, Users } from "../../models/user";
import { Product, ProductStorage } from "../../models/product";

const productsOrders = new ProductsOrders();
const users = new Users();
const productStorage = new ProductStorage();

describe("order model", () => {
  const user: User = {
    id: 1,
    firstname: "Alison",
    lastname: "Colin",
    username: "alisoncolin",
    password: "alisoncolin999",
  };

  const product: Product = {
    id: 1,
    name: "Light Bulb",
    price: "9.99",
    category_id: 3,
  };

  const order: Order = {
    id: 1,
    user_id: 1,
    status: false,
  };

  beforeAll(async () => {
    await users.create(user);
    await productsOrders.create(order);
    await productStorage.create(product);
  });

  it("should index orders", async () => {
    await productsOrders.create(order);
    const orders = await productsOrders.index();
    expect(orders.length).toBeGreaterThan(0);
  });

  it("should show order", async () => {
    const result = await productsOrders.show(1);
    expect(result).not.toBeNull();
  });

  it("should create new order", async () => {
    const order: Order = {
      id: 2,
      user_id: 1,
      status: false,
    };
    const result = await productsOrders.create(order);
    expect(result).not.toBeNull();
  });

  it("should complete order", async () => {
    const order: Order = {
      id: 3,
      user_id: 1,
      status: false,
    };
    const newOrder = await productsOrders.create(order);
    const result = await productsOrders.completeOrder(Number(newOrder.id));
    expect(result.status).toEqual(true);
  });

  it("should add product to order", async () => {
    const productOrder: ProductOrder = {
      id: 1,
      user_id: 1,
      status: false,
      product_id: 1,
      quantity: 5,
    };
    const result = await productsOrders.addProduct(
      Number(productOrder.id),
      Number(productOrder.product_id),
      Number(productOrder.quantity)
    );
    expect(result).not.toBeNull();
  });

  it("should update product of order", async () => {
    await productsOrders.addProduct(1, 1, 5);
    const result = await productsOrders.updateProduct(1, 1, 10);
    expect(result).not.toBeNull();
    expect(Number(result.quantity)).toEqual(10);
  });

  it("should remove product from order", async () => {
    const productOrder: ProductOrder = {
      id: 1,
      user_id: 1,
      status: false,
      product_id: 1,
      quantity: 10,
    };
    expect(
      async () => await productsOrders.removeProduct(Number(productOrder.id), Number(productOrder.product_id))
    ).not.toThrowError();
  });

  it("should get orders by user id", async () => {
    const productOrder = await productsOrders.getOrderByUserId(1);
    expect(productOrder).not.toBeNull();
  });

  it("should get completed orders by user id", async () => {
    const order: Order = {
      user_id: 1,
      status: false,
    };
    const newOrder = await productsOrders.create(order);
    const completed = await productsOrders.completeOrder(Number(newOrder.id));
    const completedOrders = await productsOrders.completedOrders(Number(completed.user_id));
    expect(completedOrders.length).toBeGreaterThan(0);
  });

  it("should delete order", async () => {
    expect(async () => await productsOrders.delete(2)).not.toThrowError();
  });

  afterAll(async () => {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql =
        "TRUNCATE orders RESTART IDENTITY CASCADE; " +
        "TRUNCATE users RESTART IDENTITY CASCADE; " +
        "TRUNCATE products RESTART IDENTITY CASCADE; " +
        "TRUNCATE products_orders RESTART IDENTITY CASCADE; ";
      await connection.query(sql);
    } catch (err) {
      throw new Error(`Could not truncate table orders. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  });
});
