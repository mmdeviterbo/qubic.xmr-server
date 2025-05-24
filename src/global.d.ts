import { Collection, Db } from "mongodb";
import { Block } from "./db/collections/block_found";

declare global {
  var db: Db;
  var blocksCollection: Collection<Block>;
}
    
export {};