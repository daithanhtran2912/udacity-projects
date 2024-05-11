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

  async update(p: Product): Promise<Product> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "UPDATE products SET name=($1), price=($2), category_id=($3) WHERE id=($4) RETURNING *";
      const result = await connection.query(sql, [p.name, p.price, p.category_id, p.id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product with id ${p.id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async delete(p: Product): Promise<void> {
    let connection = null;
    try {
      connection = await Client.connect();
      // This is not practical to remove products from the products_orders table.
      // However, as this is a learning project, let's keep it simple. :D
      const sqlDeleteProductsOrders = "DELETE FROM products_orders WHERE product_id=($1)";
      await connection.query(sqlDeleteProductsOrders, [p.id]);
      const sqlDeleteProducts = "DELETE FROM products WHERE id=($1)";
      await connection.query(sqlDeleteProducts, [p.id]);
    } catch (err) {
      throw new Error(`Could not delete product with id ${p.id}. ${err}`);
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
      const sql =
        "SELECT p.name, p.price, p.category_id, SUM(po.quantity) as total_sales " +
        " FROM products p LEFT JOIN products_orders po ON po.product_id=p.id " +
        " GROUP BY p.name, p.price, p.category_id " +
        " ORDER BY total_sales DESC LIMIT 5";
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
