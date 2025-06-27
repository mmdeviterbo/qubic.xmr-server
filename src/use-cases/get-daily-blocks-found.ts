import { Request, Response } from "express";

import { findAllBlocks } from "../db/collections/block_found/get/findAllBlocks";

const getDailyBlocksFound = async(req: Request, res: Response) => {
  try{
    const dailyBlocks = await findAllBlocks();
    res.status(200).json(dailyBlocks)  
  }catch(error) {
    res.status(400);
  }
}

export default getDailyBlocksFound;