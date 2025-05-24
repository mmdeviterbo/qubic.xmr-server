import { Filter } from "mongodb";
import { Block, getBlocksCollection } from "..";
import { getDateFromTimestamp } from "../../../../utils/date";

export const findOneBlock = async(params: Partial<Block>) => {
  const _params: Filter<Block> = {};

  if(params._id) {
    _params._id = params._id 
  }
  if(params.timestamp) {
    const date = getDateFromTimestamp(params.timestamp);
    _params.timestamp = { $regex: date }
  }

  const blockCollection = await getBlocksCollection(); 
  return await blockCollection.findOne(_params);
}
