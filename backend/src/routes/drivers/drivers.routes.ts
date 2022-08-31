import { Driver } from "@/src/lib/types";
import { Response, Router } from "express";
import { getDriversDatabase } from ".";

const driversRouter = Router();

//

function sendResponseNoDatabase(response: Response) {
  response.status(500).send(null);
}

function sendResponse(response: Response, code: number) {
  const db = getDriversDatabase();

  if (db) {
    response.status(code).json(db);
  } else {
    sendResponseNoDatabase(response);
  }
}

function swapPlaces(driverA: Driver, driverB: Driver) {
  const tmp = driverA.place;
  driverA.place = driverB.place;
  driverB.place = tmp;
}

//

driversRouter.get("/drivers", (_, response) => {
  sendResponse(response, 200);
});

driversRouter.post("/drivers/:id/overtake", (request, response) => {
  const db = getDriversDatabase();

  if (!db) return sendResponseNoDatabase(response);

  const id = parseInt(request.params["id"]);

  if (isNaN(id)) return sendResponse(response, 400);

  const driverA = db.find((driver) => driver.id === id);

  if (!driverA) return sendResponse(response, 404);

  const driverB = db.find((driver) => driver.place === driverA.place! - 1);

  if (!driverB) return sendResponse(response, 200);

  swapPlaces(driverA, driverB);

  sendResponse(response, 201);
});

export default driversRouter;
