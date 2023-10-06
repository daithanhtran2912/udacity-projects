import { Request, Response, Router } from "express";

const defaultRoute = Router();

defaultRoute.get("/", (_req: Request, res: Response): void => {
  const html = `
    <h1 style='text-align: center;'>Welcome To Image Processing API!</h1>
    <h3>
      <div style='text-align: center;'>
        Try <a href="/api/images">/api/images</a>
      </div>
    </h3>`;
  res.status(200).type("html").send(html);
});

export default defaultRoute;
