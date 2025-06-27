import 'dotenv/config'
import express from "express";
import cors from 'cors';
import helmet from "helmet";
import { start } from "./db";
import getDailyBlocksFound from "./use-cases/get-daily-blocks-found";
import getHighestHashrate from "./use-cases/get-highest-hashrate";
import { CLIENT_LOCAL_URL, CLIENT_STG_URL, CLIENT_URL } from './utils/constants';

const app = express();
app.use(helmet());
app.use(express.json());

const allowedOrigins = [CLIENT_URL, CLIENT_STG_URL, CLIENT_LOCAL_URL];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Pay me first mdfckr.'));
  }
}))

app.get("/daily-blocks-found", getDailyBlocksFound);
app.get("/highest-hashrate", getHighestHashrate);

try {
  start(app);
} catch(e) {
  console.log("Error ./src/index.ts: ", e);
}
