import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productRoutes from "./handlers/products";
import userRoutes from "./handlers/users";

const app: express.Application = express();
const port = 3000;
const address: string = `0.0.0.0:${port}`;

app.use(bodyParser.json());

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

productRoutes(app);
userRoutes(app);

export default app;
