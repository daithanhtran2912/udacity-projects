import fs from "fs";
import path from "path";
import supertest from "supertest";
import app from "../..";
import { IMAGES_THUMB_PATH } from "../../constant/constant";

const request = supertest(app);
describe("images api should be able to access without error", (): void => {
  const filename = "fjord";
  const width = 200;
  const height = 200;
  const thumbFilePath = path.join(IMAGES_THUMB_PATH, `${filename}_${width}x${height}.jpg`);

  beforeAll((): void => {
    if (!fs.existsSync(IMAGES_THUMB_PATH)) {
      fs.mkdirSync(IMAGES_THUMB_PATH);
    }
  });

  it("should get the images api endpoint with status 200", async (): Promise<void> => {
    const response = await request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`);
    expect(response.status).toBe(200);
  });

  afterAll((): void => {
    fs.unlinkSync(thumbFilePath);
  });
});
