import express from "express";
import routes from "./routes";
import fs from "fs";
import { IMAGES_THUMB_PATH } from "./constant/constant";

const app = express();
const port = 3000;

app.use("/", routes);

app.listen(port, (): void => {
  if (!fs.existsSync(IMAGES_THUMB_PATH)) {
    fs.mkdirSync(IMAGES_THUMB_PATH);
  }
  console.log(`Server listening on port: ${port}`);
});

export default app;
