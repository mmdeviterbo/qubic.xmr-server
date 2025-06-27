import { Request, Response } from "express";
import { findAllHashrates } from "../db/collections/peak_hashrate/get/findAllHashrates";

const getMaxHashratePerEpoch = async(req: Request, res: Response) => {
  try{
    const hashratesPerEpoch = await findAllHashrates();
    res.status(200).json(hashratesPerEpoch)
  }catch(error) {
    res.status(400);
  }
}

export default getMaxHashratePerEpoch;