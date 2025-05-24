import express from "express";
import helmet from "helmet";
import { start } from "./db";

const app = express();
app.use(helmet());
app.use(express.json());


start(app);
