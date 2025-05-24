import { Filter } from "mongodb";
import { Block, getBlocksCollection } from "..";
import { getDateFromTimestamp } from "../../../../utils/date";

export const updateOneBlock = async(params: Partial<Block>, body: Partial<Block>) => {
  const _params: Filter<Block> = {} 

  if(params._id) {
    _params._id = params._id;
  }
  if(params.timestamp) {
    const date = getDateFromTimestamp(params.timestamp)
    _params.timestamp = { $regex: date }
  }

  const blockCollection = await getBlocksCollection(); 
  return await blockCollection.findOneAndUpdate(_params, { $set: body }, { returnDocument: "after" } );
}