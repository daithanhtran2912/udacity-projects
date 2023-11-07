import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: string;
  category_id?: number;
};

export class ProductStorage {
  async index(): Promise<Product[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM products";
      const products = await connection.query(sql);
      return products.rows;
    } catch (err) {
      throw new Error(`Could not get products list. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async show(id: number): Promise<Product> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      if (!result.rowCount) {
        throw new Error("No data found!");
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product with id ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async create(p: Product): Promise<Product> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "INSERT INTO products(name, price, category_id) VALUES($1, $2, $3) RETURNING *";
      const result = await connection.query(sql, [p.name, p.price, p.category_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create product. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async findProductsByCategory(category_id: number): Promise<Product[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql =
        "SELECT products.* " +
        " FROM products JOIN categories ON products.category_id=categories.id " +
        " WHERE products.category_id=($1)";
      const result = await connection.query(sql, [category_id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find products by category_id ${category_id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async topFiveProducts(): Promise<Product[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql ="SELECT * FROM products LIMIT 5";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find products. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }
}
