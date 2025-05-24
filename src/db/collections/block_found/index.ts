import { getDB } from './../../index';
import { Collection, Db } from "mongodb";
import { BLOCKS_COLLECTION } from "../../../utils/constants";

export interface Block {
  _id?: string;
  block_found: number;
  timestamp: string; //2025-05-24T00:59:37.865Z
}


export const getBlocksCollection = async(): Promise<Collection<Block>> => (await getDB()).collection(BLOCKS_COLLECTION);

export async function createBlocksCollection(db: Db) {
  try {
    await db.createCollection(BLOCKS_COLLECTION);
  } catch (error) {
      console.error("Error creating collection:", error);
  }
}
