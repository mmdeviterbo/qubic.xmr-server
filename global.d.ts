import { Collection, Db } from "mongodb";
import { Block } from "./src/db/collections/block_found";
import { Hashrates } from "./src/db/collections/peak_hashrate";

declare global {
  var db: Db;
  var blocksCollection: Collection<Block>;
  var hashratesCollection: Collection<Hashrates>;
}

export {}