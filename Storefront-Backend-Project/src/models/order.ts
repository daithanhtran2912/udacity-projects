import Client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: boolean;
};

export type ProductOrder = {
  id?: number;
  product_id?: number;
  name?: number;
  price?: number;
  quantity?: number;
  user_id?: number;
  status?: boolean;
};

export class ProductsOrders {
  async index(): Promise<Order[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not index orders. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async show(id: number): Promise<ProductOrder[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql =
        "SELECT o.id, po.product_id, p.name, p.price, po.quantity, o.user_id, o.status " +
        " FROM orders o " +
        " LEFT JOIN products_orders po ON po.order_id=o.id " +
        " LEFT JOIN products p ON po.product_id=p.id " +
        " WHERE o.id=($1)";
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not show order with id ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async create(o: Order): Promise<Order> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *";
      const result = await connection.query(sql, [o.user_id, o.status]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async completeOrder(id: number): Promise<Order> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "UPDATE orders SET status='true' WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order id ${id} status. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async delete(id: number): Promise<void> {
    let connection = null;
    try {
      connection = await Client.connect();
      // This is not practical to remove orders from the products_orders table.
      // However, as this is a learning project, let's keep it simple. :D
      const sqlDeleteProductsOrders = "DELETE FROM products_orders WHERE order_id=($1)";
      await connection.query(sqlDeleteProductsOrders, [id]);
      const sqlDeleteOrders = "DELETE FROM orders WHERE id=($1)";
      await connection.query(sqlDeleteOrders, [id]);
    } catch (err) {
      throw new Error(`Could not delete order with id ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async addProduct(order_id: number, product_id: number, quantity: number): Promise<ProductOrder> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql =
        "INSERT INTO products_orders(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await connection.query(sql, [order_id, product_id, quantity]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product id ${product_id} to order id ${order_id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async updateProduct(order_id: number, product_id: number, quantity: number): Promise<ProductOrder> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "UPDATE products_orders SET quantity=$1 WHERE order_id=$2 AND product_id=$3 RETURNING *";
      const result = await connection.query(sql, [quantity, order_id, product_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product id ${product_id} quantity to order id ${order_id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async removeProduct(order_id: number, product_id: number): Promise<void> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "DELETE FROM products_orders WHERE order_id=$1 AND product_id=$2";
      await connection.query(sql, [order_id, product_id]);
    } catch (err) {
      throw new Error(`Could not delete product id ${product_id} of order id ${order_id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async getOrderByUserId(id: number): Promise<ProductOrder[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql =
        "SELECT o.id, po.product_id, p.name, p.price, po.quantity, o.user_id, o.status " +
        " FROM orders o " +
        " LEFT JOIN products_orders po ON po.order_id=o.id " +
        " LEFT JOIN products p ON po.product_id=p.id " +
        " WHERE o.user_id=($1)";
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order by user id ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async completedOrders(id: number): Promise<ProductOrder[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM orders WHERE status=true AND user_id=($1)";
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders by user id ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }
}
