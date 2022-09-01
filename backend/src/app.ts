import express from "express";
import { resolve } from "path";
import { dropDrivers, getDrivers, setupDBTable } from "./queries";
import driversRouter from "./routes/drivers/drivers.routes";

const app = express();

app.use(express.json());
app.use("/static", express.static(resolve("database/static")));
app.use("/api", driversRouter);

void getDrivers;
void dropDrivers;
// app.use("/test", getDrivers);
// app.use("/drop", dropDrivers);

setupDBTable(() => {});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(resolve("../frontend/build")));
  app.get("*", (req, res) => {
    if (req.path.endsWith(".html")) {
      res.redirect(req.path.split(".").slice(0, -1).join("."));
      return;
    }

    res.sendFile(resolve("../frontend/build/index.html"));
  });
}

export default app;
