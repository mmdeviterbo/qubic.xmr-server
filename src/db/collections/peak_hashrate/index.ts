import { HASHRATES_COLLECTION } from "../../../utils/constants";

export interface Hashrates {
  _id?: string;
  max_hashrate: number;
  timestamp: string; //2025-05-24T00:59:37.865Z
  epoch: number;
}

export async function createHashratesCollection() {
  try {
    global.hashratesCollection = await global.db.createCollection(HASHRATES_COLLECTION);
  } catch (error) {
      console.error("Error creating collection:", error);
  }
}
