import { Express } from "express";
import { MongoClient, ServerApiVersion } from "mongodb"

import { createBlocksCollection } from "./collections/block_found";
import { QUBIC_DATABASE } from "../utils/constants";
import saveHighestBlockFound from "../use-cases/save-highest-block-found";

const DB_URI = process.env.DB_URI as string;
const PORT = process.env.PORT as string;

const client = new MongoClient(DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const getDB = async() => await client.db(QUBIC_DATABASE);

export const start = async(app: Express) => {
  try {
    await client.connect();
    const db = client.db(QUBIC_DATABASE);
    await createBlocksCollection(db);
    console.log("MongoDB connected ...")

    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });

    void saveHighestBlockFound();
  } catch (e) {
    console.log("Error initializing database")
    await client.close();
  }
}



