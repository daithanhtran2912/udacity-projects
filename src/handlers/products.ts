import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Product, ProductStorage } from "../models/product";
import { CategoryList } from "../models/category";

const productStorage = new ProductStorage();
const categories = new CategoryList();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await productStorage.index();
    res.json(products);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productStorage.show(id);
    res.json(product);
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
    const category_id = req.body.category_id;
    const category = await categories.show(category_id);
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category_id: category !== null ? category_id : null,
    };
    res.json(await productStorage.create(product));
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const findProductByCategory = async (req: Request, res: Response) => {
  try {
    const category_id = Number(req.params.id);
    const products = await productStorage.findProductsByCategory(category_id);
    res.json(products);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const topFiveProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productStorage.topFiveProducts();
    res.json(products);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.get("/products/categories/:id", findProductByCategory);
  app.get("/most-popular", topFiveProducts);
  app.post("/products", create);
};

export default productRoutes;
