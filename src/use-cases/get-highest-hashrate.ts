import { Request, Response } from "express";
import { findOneHashrate } from "../db/collections/peak_hashrate/get/findOne";

const getHighestHashrate = async(req: Request, res: Response) => {
  try{
    const highestHashrate = await findOneHashrate();
    res.status(200).json(highestHashrate)  
  }catch(error) {
    res.status(400);
  }
}

export default getHighestHashrate;