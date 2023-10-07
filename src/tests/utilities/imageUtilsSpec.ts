import path from "path";
import fs from "fs";
import { processImage } from "../../utilities/imageUtils";
import { IMAGES_THUMB_PATH } from "../../constant/constant";

const filename = "fjord";
const width = 200;
const height = 200;

describe("Testing image valiation utility", (): void => {
  it("should throw error when filename is empty", async (): Promise<void> => {
    await expectAsync(processImage("", height, width))
      .toBeRejectedWithError("Unable to retrieve filename!");
  });

  it("should throw error when filename does not exist", async (): Promise<void> => {
    await expectAsync(processImage("test", height, width))
      .toBeRejectedWithError("File name: test does not exist!");
  });

  it("should throw error when height is not a number", async (): Promise<void> => {
    const strHeight = "height" as unknown as number;
    await expectAsync(processImage(filename, strHeight, width))
      .toBeRejectedWithError("Either height is empty or not a number!");
  });

  it("should throw error when height is empty", async (): Promise<void> => {
    const strHeight = undefined as unknown as number;
    await expectAsync(processImage(filename, strHeight, width))
      .toBeRejectedWithError("Either height is empty or not a number!");
  });

  it("should throw error when height is smaller than 1", async (): Promise<void> => {
    await expectAsync(processImage(filename, 0, width))
      .toBeRejectedWithError("Height must be greater than 1!");
  });

  it("should throw error when width is not a number", async (): Promise<void> => {
    const strWidth = "width" as unknown as number;
    await expectAsync(processImage(filename, height, strWidth))
      .toBeRejectedWithError("Either width is empty or not a number!");
  });

  it("should throw error when width is empty", async (): Promise<void> => {
    const strWidth = undefined as unknown as number;
    await expectAsync(processImage(filename, height, strWidth))
      .toBeRejectedWithError("Either width is empty or not a number!");
  });

  it("should throw error when width is smaller than 1", async (): Promise<void> => {
    await expectAsync(processImage(filename, height, 0))
      .toBeRejectedWithError("Width must be greater than 1!");
  });
});

describe("Testing image process utility", (): void => {
  const thumbFilePath = path.join(IMAGES_THUMB_PATH, `${filename}_${width}x${height}.jpg`);
  it("should be able to resize image", async (): Promise<void> => {
    const resizedImage = await processImage(filename, height, width);
    expect(thumbFilePath).toBe(resizedImage);
  });

  afterAll((): void => {
    fs.unlinkSync(thumbFilePath);
  });
});
