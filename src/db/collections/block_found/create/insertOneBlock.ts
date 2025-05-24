import { Block } from "..";

export const insertOneBlock = async(body: Block): Promise<string> => {
  return (await global.blockCollection.insertOne(body))?.insertedId;
}