import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Order, ProductsOrders } from "../models/order";
import { Users } from "../models/user";

const productsOrders = new ProductsOrders();
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
    const result = await productsOrders.index();
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
    if (Number.isNaN(id)) {
      throw new Error("Invalid request data!");
    }
    const result = await productsOrders.show(id);
    res.json(result);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization!.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
  } catch (err) {
    res.status(401).json("Access denied, invalid token!");
    return;
  }

  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: false,
    };
    // Verify user_id existed
    await users.show(order.user_id);
    const result = await productsOrders.create(order);
    res.json(result);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const getOrderByUserId = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization!.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
  } catch (err) {
    res.status(401).json("Access denied, invalid token!");
    return;
  }

  try {
    const user_id = Number(req.params.id);
    if (Number.isNaN(user_id)) {
      throw new Error("Invalid request data!");
    }
    const orders = await productsOrders.getOrderByUserId(user_id);
    res.json(orders);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const addProductOrder = async (req: Request, res: Response) => {
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
    const product_id = Number(req.body.product_id);
    const quantity = Number(req.body.quantity);
    if (Number.isNaN(id) || Number.isNaN(product_id) || Number.isNaN(quantity) || quantity <= 0) {
      throw new Error("Invalid request data!");
    }
    const orders = await productsOrders.addProduct(id, product_id, quantity);
    res.json(orders);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const updateProductOrder = async (req: Request, res: Response) => {
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
    const product_id = Number(req.params.product_id);
    const quantity = Number(req.body.quantity);
    if (Number.isNaN(id) || Number.isNaN(product_id) || Number.isNaN(quantity) || quantity <= 0) {
      throw new Error("Invalid request data!");
    }
    const orders = await productsOrders.updateProduct(id, product_id, quantity);
    res.json(orders);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const removeProductOrder = async (req: Request, res: Response) => {
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
    const product_id = Number(req.params.product_id);
    if (Number.isNaN(id) || Number.isNaN(product_id)) {
      throw new Error("Invalid request data!");
    }
    const orders = await productsOrders.removeProduct(id, product_id);
    res.json(orders);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
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
    await productsOrders.delete(id);
    res.status(200).json("Success");
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const completeOrder = async (req: Request, res: Response) => {
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
    if (Number.isNaN(id)) {
      throw new Error("Invalid request data!");
    }
    const result = await productsOrders.completeOrder(id);
    res.json(result);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const completedOrders = async (req: Request, res: Response) => {
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
    if (Number.isNaN(id)) {
      throw new Error("Invalid request data!");
    }
    const result = await productsOrders.completedOrders(id);
    res.json(result);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.get("/orders/users/:id", getOrderByUserId);
  app.get("/orders/users/:id/completed", completedOrders);
  app.post("/orders", create);
  app.post("/orders/:id", completeOrder);
  app.post("/orders/:id/products", addProductOrder);
  app.put("/orders/:id/products/:product_id", updateProductOrder);
  app.delete("/orders/:id/products/:product_id", removeProductOrder);
  app.delete("/orders/:id", deleteOrder);
};

export default orderRoutes;
