import { Request, Response } from "express";

import { findOneBlock } from "../db/collections/block_found/get/findOneBlock"
import { getDateFromTimestamp, getYesterdayDate } from "../utils/date";

const getDailyBlocksFound = async(req: Request, res: Response) => {
  try{
    const yesterdayDate = getYesterdayDate();
    let yesterdayTotalBlocksFound = (await findOneBlock({ timestamp: yesterdayDate }))?.block_found;
    if(!yesterdayTotalBlocksFound) {
      yesterdayTotalBlocksFound = 0;
    }
  
    const todayDate = getDateFromTimestamp(new Date().toISOString());
    const todayTotalBlocksFound = (await findOneBlock({ timestamp: todayDate }))!.block_found;
  
    const block_found_daily = todayTotalBlocksFound - yesterdayTotalBlocksFound; 
  
    res.status(200).json({ block_found_daily })  
  }catch(error) {
    res.status(400);
  }
}

export default getDailyBlocksFound;