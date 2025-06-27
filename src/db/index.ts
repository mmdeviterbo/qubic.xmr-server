import { Express } from "express";
import { MongoClient, ServerApiVersion } from "mongodb"

import saveHighestBlockFound from "../use-cases/save-daily-blocks-found";
import { QUBIC_DATABASE } from "../utils/constants";
import { createBlocksCollection } from "./collections/block_found";
import { createHashratesCollection } from "./collections/peak_hashrate";
import saveHighestHashrate from "../use-cases/save-highest-hashrate";

const DB_URI = process.env.DB_URI as string;
const PORT = process.env.PORT as string;

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("DB_URI: ", DB_URI);
console.log("PORT: ", PORT);


const client = new MongoClient(DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const start = async(app: Express) => {
  try {

    await client.connect();
    global.db = await client.db(QUBIC_DATABASE);
    await createBlocksCollection();
    await createHashratesCollection();

    console.log("MongoDB connected ...")

    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
      if(process.send) {
        process.send!('ready');
      }
      
      void saveHighestBlockFound();
      void saveHighestHashrate();
    });

  } catch (e) {
    console.log("Error initializing database: ", e)
    await client.close();
  }
}



