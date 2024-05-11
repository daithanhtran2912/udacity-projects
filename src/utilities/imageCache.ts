import fs from "fs";
import path from "path";
import { processImage } from "./imageUtils";
import { IMAGES_THUMB_PATH } from "../constant/constant";

const IMAGES_CACHE = new Map<string, { createdTime: number; filePath: string }>(); // <resizedFileName, {createdTime, filePath}>
const TTL: number = 3_600_000; // 1 hour

const fetchImagesCache = async (filename: string, height: number, width: number): Promise<string> => {
  const resizedFileName = `${filename}_${width}x${height}.jpg`;
  const image = IMAGES_CACHE.get(resizedFileName);

  if (image) {
    const thumbFilePath = path.join(IMAGES_THUMB_PATH, resizedFileName);

    // Checking if the image expired.
    if (isExpired(image.createdTime)) {
      console.log(`Image ${resizedFileName} expired!`);
      clearCache(resizedFileName);
      fs.unlinkSync(thumbFilePath);
      const newThumbFilePath = await processImage(filename, height, width);
      IMAGES_CACHE.set(resizedFileName, { createdTime: Date.now(), filePath: newThumbFilePath });
      return newThumbFilePath;
    }

    // Checking if the image was manually deleted.
    if (!fs.existsSync(thumbFilePath)) {
      console.log(`Cannot fetch ${resizedFileName} from cache!`);
      const newThumbFilePath = await processImage(filename, height, width);
      IMAGES_CACHE.set(resizedFileName, { createdTime: Date.now(), filePath: newThumbFilePath });
      return newThumbFilePath;
    }
    console.log(`Fetching ${resizedFileName} from cache...`);
    return thumbFilePath;
  }

  // Return fresh image
  const newThumbFilePath = await processImage(filename, height, width);
  IMAGES_CACHE.set(resizedFileName, { createdTime: Date.now(), filePath: newThumbFilePath });
  return newThumbFilePath;
};

const isExpired = (createdTime: number): boolean => {
  if (Date.now() - createdTime > TTL) {
    return true;
  }
  return false;
};

const clearCache = (resizedFileName: string): void => {
  IMAGES_CACHE.delete(resizedFileName);
  console.log(`${resizedFileName} deleted!`);
};

export { fetchImagesCache };
