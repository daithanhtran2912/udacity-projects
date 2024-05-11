import express, { Request, Response } from "express";
import imagesRoute from "./images";

const api = express.Router();

api.use("/images", imagesRoute);

api.get("/", (_req: Request, res: Response): void => {
  const html = `
    <h3 style='font-family:courier,arial,helvetica; padding-top: 10%'>
      <div style='text-align: center;'>
        GET <a href="/api/images">/api/images</a>
      </div>
    </h3>`;
  res.status(200).type("html").send(html);
});

export default api;
