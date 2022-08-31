import express from "express";
import driversRouter from "./routes/drivers/drivers.routes";

const app = express();

app.use(express.json());
app.use("/static", express.static("database/static"));
app.use("/api", driversRouter);

export default app;
