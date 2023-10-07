import path from "path";
import fs from "fs";
import { fetchImagesCache } from "../../utilities/imageCache";
import { IMAGES_THUMB_PATH } from "../../constant/constant";

describe("Testing image caching utilities", (): void => {
  const filename = "fjord";
  const width = 200;
  const height = 200;
  const thumbFilePath = path.join(IMAGES_THUMB_PATH, `${filename}_${width}x${height}.jpg`);

  it("should be able to get image from cache", async (): Promise<void> => {
    const imagePath = await fetchImagesCache(filename, height, width);
    expect(thumbFilePath).toBe(imagePath);
  });

  it("should fetch image from cache", async (): Promise<void> => {
    const imagePath = await fetchImagesCache(filename, height, width);
    expect(thumbFilePath).toBe(imagePath);
  });

  it("should be able to process image when cannot fetch from cache", async (): Promise<void> => {
    // Remove image that have been created from the begining
    fs.unlinkSync(path.join(IMAGES_THUMB_PATH, `${filename}_${width}x${height}.jpg`));
    // Testing imageCache will process new image
    const imagePath = await fetchImagesCache(filename, height, width);
    expect(thumbFilePath).toBe(imagePath);
  });

  afterAll((): void => {
    fs.unlinkSync(thumbFilePath);
  });
});
