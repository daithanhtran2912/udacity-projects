import Client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
};

export class Users {
  async index(): Promise<User[]> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM users";
      const users = await connection.query(sql);
      return users.rows;
    } catch (err) {
      throw new Error(`Could not get users list: ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async show(id: number): Promise<User> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await connection.query(sql, [id]);
      if (!result.rowCount) {
        throw new Error("No data found!");
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with id = ${id}. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async create(u: User): Promise<User> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql =
        "INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *";
      const hash = bcrypt.hashSync(u.password + process.env.PEPPER, Number(process.env.SALT_ROUND));
      const result = await connection.query(sql, [u.firstname, u.lastname, u.username, hash]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create user (${u.username}). ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "SELECT password FROM users WHERE username=($1)";
      const result = await connection.query(sql, [username]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + process.env.PEPPER, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user (${username}). ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  }
}
