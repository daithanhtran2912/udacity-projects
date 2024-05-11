import Client from "../database";

export type Category = {
  id?: number;
  name: string;
};

export class CategoryList {
  async show(id: number): Promise<Category | null> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM categories WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(`Could not get category with id ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }
}
