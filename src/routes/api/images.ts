import express, { Request, Response } from "express";
import imageUtils from "../../utilities/imageUtils";

const imagesRoute = express.Router();

imagesRoute.get("/", (req: Request, res: Response): void => {
  try {
    const filename = req.query.filename as string;
    const height = parseInt(req.query.height as string);
    const width = parseInt(req.query.width as string);
    imageUtils.validate(filename, height, width);
    imageUtils.processImage();
    res.status(200).send("200");
  } catch (error) {
    res.status(400).send("400 - " + error);
  }
});

export default imagesRoute;
