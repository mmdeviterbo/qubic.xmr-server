import { Filter } from "mongodb";
import { Block } from "..";
import { getDateFromTimestamp } from "../../../../utils/date";

export const findAllBlocks = async(params?: Partial<Block>) => {
  const _params: Filter<Block> = {};

  if(params?.timestamp) {
    const date = getDateFromTimestamp(params.timestamp);
    _params.timestamp = { $regex: date }
  }

  const data = await global.blocksCollection.find(_params).sort({ timestamp: 1 });
  const response = await data.toArray();
  
  return response;
}
