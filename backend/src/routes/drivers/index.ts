import { DriversDatabase } from "@/src/lib/types";
import driversDatabaseJSON from "../../../database/drivers.json";

let driversDatabase: DriversDatabase | undefined = undefined;

function initDriversDatabase() {
  driversDatabase = driversDatabaseJSON;

  const places = driversDatabase
    .map((_, index) => index)
    .sort(() => (Math.random() < 0.5 ? 1 : -1));

  driversDatabase.forEach((driver, index) => {
    driver.place = places[index];
    driver.imgUrl = `/static/${driver.code.toLowerCase()}.png`;
  });
}

export function getDriversDatabase() {
  if (driversDatabase === undefined) {
    initDriversDatabase();
  }

  return driversDatabase;
}
