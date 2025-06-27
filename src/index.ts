import express from "express";
import helmet from "helmet";
import { start } from "./db";
import getDailyBlocksFound from "./use-cases/get-daily-blocks-found";
import getHighestHashrate from "./use-cases/get-highest-hashrate";


const app = express();
app.use(helmet());
app.use(express.json());

app.get("/daily-blocks-found", getDailyBlocksFound);
app.get("/highest-hashrate", getHighestHashrate);

start(app);
