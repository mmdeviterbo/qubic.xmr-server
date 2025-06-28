import type { Request, Response } from "express";
import { findAllBlocks } from "@/db/collections/block_found/get/findAllBlock";
import { findAllHashrates } from "@/db/collections/peak_hashrate/get/findAllHashrates";

const getAdvanceMiningStats = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let returnValue = "";
  const interval = setInterval(async() => {
    const dailyBlocks = await findAllBlocks();
    const hashratesPerEpoch = await findAllHashrates();

    const stringifiedJSON = JSON.stringify({ dailyBlocks, hashratesPerEpoch });
    if(stringifiedJSON !== returnValue) {
      returnValue = stringifiedJSON
      res.write(`data: ${JSON.stringify({ dailyBlocks, hashratesPerEpoch })}\n\n`);
    }
  }, 6000);

  req.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected from SSE -- getAdvanceMiningStats: ', new Date());
  });
};
export default getAdvanceMiningStats;