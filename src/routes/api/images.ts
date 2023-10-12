import express, { Request, Response } from "express";
import { fetchImagesCache } from "../../utilities/imageCache";

const imagesRoute = express.Router();

imagesRoute.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const filename = req.query.filename as string;
    const height = Number(req.query.height as string);
    const width = Number(req.query.width as string);
    const imagePath = await fetchImagesCache(filename, height, width);
    res.status(200).sendFile(imagePath);
  } catch (error) {
    const html = `
      <div style='font-family:courier,arial,helvetica;'>
        <h1 style='text-align: center; padding-top: 10%'>400 - Bad Request</h1>
        <h3 style='text-align: center;'>${error}</h3>
      </div>`;
    res.status(400).type("html").send(html);
  }
});

export default imagesRoute;
