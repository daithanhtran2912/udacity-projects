import express from "express";
import defaultRoute from "./defaultRoute";
import api from "./api";

const routes = express.Router();
routes.use("/", defaultRoute);
routes.use("/api", api);

export default routes;
