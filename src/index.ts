import express from "express";

const app = express();
const port = 3000;

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send("Hello world!");
});

app.listen(port, (): void => {
  console.log(`Server listening on port ${port}`);
});

export default app;
