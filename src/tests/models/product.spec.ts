import { Product, ProductStorage } from "../../models/product";
import Client from "../../database";

const productStorage = new ProductStorage();

describe("product model", () => {
  const product: Product = {
    id: 1,
    name: "Light Bulb",
    price: "9.99",
    category_id: 1
  };

  beforeAll(async () => {
    await productStorage.create(product);
  });

  it("should create new product", async () => {
    const product: Product = {
      name: "Candy",
      price: "4.99"
    };
    const newProduct = await productStorage.create(product);
    expect(newProduct.name).toEqual(product.name);
    expect(newProduct.price).toEqual(product.price);
  });

  it("should index products", async () => {
    const result = await productStorage.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should show product", async () => {
    const show = await productStorage.show(1);
    expect(show.name).toEqual(product.name);
    expect(show.price).toEqual(product.price);
  });

  it("should update product", async () => {
    const product: Product = {
      name: "Candy",
      price: "4.99"
    };
    const updateProduct = await productStorage.create(product);
    updateProduct.price = "5";
    const result = await productStorage.update(updateProduct);
    expect(result).toEqual(updateProduct);
  });

  it("should delete product", async () => {
    const product: Product = {
      id: 2,
      name: "Candy",
      price: "5"
    };
    expect(async () => await productStorage.delete(product)).not.toThrowError();
  });

  it("should find products by category", async () => {
    const result = await productStorage.findProductsByCategory(1);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should get top 5 products", async () => {
    const result = await productStorage.topFiveProducts();
    expect(result.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "TRUNCATE products RESTART IDENTITY CASCADE";
      await connection.query(sql);
    } catch (err) {
      throw new Error(`Could not truncate table products. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  });
});