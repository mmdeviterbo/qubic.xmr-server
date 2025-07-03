import 'dotenv/config'
import express from "express";
import cors from 'cors';
import helmet from "helmet";

import { start } from './db';
import { getAdvanceMiningStats, getAdvanceMiningStatsByEventStream } from '@use-cases/events/get-advance-mining-stats';
import { CLIENT_LOCAL_URL, CLIENT_STG_URL, CLIENT_URL } from '@utils/constants';

const app = express();
app.use(helmet());
app.use(express.json());

const allowedOrigins = [CLIENT_URL, CLIENT_STG_URL, CLIENT_LOCAL_URL];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Pay me first mdfckr coz i pay fees'));
  }
}));

app.get("/advance-mining-stats", getAdvanceMiningStats)
app.get("/advance-mining-stats-event-stream", getAdvanceMiningStatsByEventStream)

try {
  start(app);
} catch(e) {
  console.log("Error ./src/index.ts: ", e);
}
