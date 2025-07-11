import { BLOCKS_COLLECTION } from "../../../utils/constants";

export interface Block {
  _id?: string;
  blocks_found: number;
  timestamp: string; //2025-05-24T00:59:37.865Z
  epoch: number;
}

export async function createBlocksCollection() {
  try {
    global.blocksCollection = await global.db.createCollection(BLOCKS_COLLECTION)
  } catch (error) {
      console.error("Error creating collection:", error);
  }
}
