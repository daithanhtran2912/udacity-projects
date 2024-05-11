import { User, Users } from "../../models/user";
import Client from "../../database";
import bcrypt from "bcrypt";

const users = new Users();

describe("user model", () => {
  const user: User = {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    password: "johndoe123",
  };

  beforeAll(async () => {
    await users.create(user);
  });

  it("should create new user", async () => {
    const user: User = {
      id: 2,
      firstname: "Jane",
      lastname: "Doe",
      username: "janedoe",
      password: "janedoe999",
    };
    const newUser = await users.create(user);
    expect(newUser.firstname).toEqual(user.firstname);
    expect(newUser.lastname).toEqual(user.lastname);
    expect(newUser.username).toEqual(user.username);
    expect(bcrypt.compareSync(user.password + process.env.PEPPER, newUser.password)).toBeTrue();
  });

  it("should index users", async () => {
    const result = await users.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should show user", async () => {
    const showUser = await users.show(1);
    expect(showUser.firstname).toEqual(user.firstname);
    expect(showUser.lastname).toEqual(user.lastname);
    expect(showUser.username).toEqual(user.username);
    expect(bcrypt.compareSync(user.password + process.env.PEPPER, showUser.password)).toBeTrue();
  });

  it("should authenticate user", async () => {
    const authenticateUser = await users.authenticate(user.username, user.password);
    expect(authenticateUser).not.toBeNull();
    expect(bcrypt.compareSync(user.password + process.env.PEPPER, authenticateUser!.password)).toBeTrue();
  });

  afterAll(async () => {
    let connection = null;
    try {
      connection = await Client.connect();
      const sql = "TRUNCATE users RESTART IDENTITY CASCADE";
      await connection.query(sql);
    } catch (err) {
      throw new Error(`Could not truncate table users. ${err}`);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  });
});
