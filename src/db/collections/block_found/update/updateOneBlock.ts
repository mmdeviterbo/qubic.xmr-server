import { Filter } from "mongodb";
import { Block } from "..";
import { getDateFromTimestamp } from "../../../../utils/date";

export const updateOneBlock = async(params: Partial<Block>, body: Partial<Block>) => {
  const _params: Filter<Block> = {} 

  if(params.timestamp) {
    const date = getDateFromTimestamp(params.timestamp)
    _params.timestamp = { $regex: date }
  }

  return await global.blocksCollection.findOneAndUpdate(
    _params,
    { $set: body },
    { returnDocument: "after", upsert: true }
  );
}