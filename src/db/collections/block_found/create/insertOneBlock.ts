import { Block, getBlocksCollection } from "..";

export const insertOneBlock = async(body: Block): Promise<string> => {
  const blockCollection = await getBlocksCollection(); 
  return (await blockCollection.insertOne(body))?.insertedId;
}