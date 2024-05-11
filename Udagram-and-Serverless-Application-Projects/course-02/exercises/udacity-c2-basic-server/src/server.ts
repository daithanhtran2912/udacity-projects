import express, { Router, Request, Response } from "express";
// import bodyParser from 'body-parser'; deprecated
const bodyParser = require("body-parser");

import { Car, cars as cars_list } from "./cars";

(async () => {
  let cars: Car[] = cars_list;

  //Create an express application
  const app = express();
  //default port to listen
  const port = 8082;

  //use middleware so post bodies
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true })); //for requests from forms-like data

  // Root URI call
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the Cloud!");
  });

  // Get a greeting to a specific person
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get("/persons/:name", (req: Request, res: Response) => {
    let { name } = req.params;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get("/persons/", (req: Request, res: Response) => {
    let { name } = req.query;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as
  // an application/json body to {{host}}/persons
  app.post("/persons", async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send(`name is required`);
    }

    return res.status(200).send(`Welcome to the Cloud, ${name}!`);
  });

  // Endpoint to GET a list of cars
  // Filterable by make with a query paramater
  app.get("/cars", async (req: Request, res: Response) => {
    let { make } = req.query;

    if (make) {
      return res.status(200).send(cars.filter((car) => car.make === make));
    }

    return res.status(200).send(cars);
  });

  // Endpoint to get a specific car
  // Require id
  // Fail gracefully if no matching car is found
  app.get("/cars/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    if (!id) {
      return res.status(400).send(`id is required`);
    }

    const car = cars.filter((car) => car.id === parseInt(id));
    if (!car && car.length === 0) {
      return res.status(404).send(`Car not found`);
    }

    return res.status(200).send(car);
  });

  // Endpoint to post a new car to our list
  // Require id, type, model, and cost
  app.post("/cars", async (req: Request, res: Response) => {
    let { make, type, model, cost, id } = req.body;
    if (!id || !type || !model || !cost) {
      return res.status(400).send(`make, type, model, cost, id are required`);
    }
    const car: Car = {
      make: make,
      type: type,
      model: model,
      cost: cost,
      id: id,
    };

    cars.push(car);
    return res.status(201).send(car);
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
