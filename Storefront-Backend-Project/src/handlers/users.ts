import express, { Request, Response } from "express";
import { User, Users } from "../models/user";
import jwt from "jsonwebtoken";

const users = new Users();

const index = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization!.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
  } catch (err) {
    res.status(401).json("Access denied, invalid token!");
    return;
  }

  try {
    const result = await users.index();
    res.json(result);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization!.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
  } catch (err) {
    res.status(401).json("Access denied, invalid token!");
    return;
  }

  try {
    const id = Number(req.params.id);
    const result = await users.show(id);
    res.json(result);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    Object.values(user).every((field) => {
      if (field === null || field === undefined || field === "") {
        throw new Error("Invalid request data!");
      }
    });

    const newUser = await users.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as jwt.Secret);
    res.json(token);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
};

export default userRoutes;
