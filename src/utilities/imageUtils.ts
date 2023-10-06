import fs from "fs";
import path from "path";
const imagesFullPath = "././images/full";

const validate = (filename: string, height: number, width: number): void => {
  if (!filename) {
    throw new Error("Unable to retrieve filename!");
  }

  const filePath = path.join(imagesFullPath, `${filename}.jpg`);
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

const processImage = (): void => {
  console.log("Processing image...");
};

export default {
  validate,
  processImage,
};
