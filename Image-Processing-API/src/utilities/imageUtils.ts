import fs from "fs";
import path from "path";
import sharp from "sharp";
import { IMAGES_FULL_PATH, IMAGES_THUMB_PATH } from "../constant/constant";

const processImage = async (filename: string, height: number, width: number): Promise<string> => {
  validateInput(filename, height, width);
  const fullFilePath = path.join(IMAGES_FULL_PATH, `${filename}.jpg`);
  const thumbFilePath = path.join(IMAGES_THUMB_PATH, `${filename}_${width}x${height}.jpg`);
  console.log(`Processing image ${filename}_${width}x${height}.jpg...`);
  await sharp(fullFilePath).resize(width, height).toFile(thumbFilePath);
  return `${thumbFilePath}`;
};

const validateInput = (filename: string, height: number, width: number): void => {
  if (!filename) {
    throw new Error("Unable to retrieve filename!");
  }

  const filePath = path.join(IMAGES_FULL_PATH, `${filename}.jpg`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File name: ${filename} does not exist!`);
  }

  if (isNaN(height)) {
    throw new Error("Either height is empty or not a number!");
  }

  if (height < 1) {
    throw new Error("Height must be greater than 1!");
  }

  if (isNaN(width)) {
    throw new Error("Either width is empty or not a number!");
  }

  if (width < 1) {
    throw new Error("Width must be greater than 1!");
  }
};

export { processImage };
