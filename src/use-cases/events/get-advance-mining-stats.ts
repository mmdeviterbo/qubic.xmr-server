import type { Request, Response } from "express";
import { findAllBlocks } from "@db/collections/blocks_found/get/findAllBlocks";
import { findAllHashrates } from "@/db/collections/peak_hashrate/get/findAllHashrates";

export const getAdvanceMiningStatsByEventStream = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    console.log('Client connected from SSE -- getAdvanceMiningStats: ', new Date());

    let returnValue = "";
    const interval = setInterval(async() => {
      const dailyBlocks = await findAllBlocks();
      const hashratesPerEpoch = await findAllHashrates();
  
      const stringifiedJSON = JSON.stringify({ blocks: dailyBlocks, hashrates: hashratesPerEpoch });
      if(stringifiedJSON !== returnValue) {
        returnValue = stringifiedJSON
        res.write(`data: ${stringifiedJSON}\n\n`);
      }
    }, 3000);
  
    req.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected from SSE -- getAdvanceMiningStats: ', new Date());
    });
  }catch(error) {
    console.log("Error getAdvanceMiningStatsByEventSteam")
  }
};

export const getAdvanceMiningStats = async (req: Request, res: Response) => {
  try {
    const dailyBlocks = await findAllBlocks();
    const hashratesPerEpoch = await findAllHashrates();
    res.status(200).json({ blocks: dailyBlocks, hashrates: hashratesPerEpoch })
  } catch (error) {
    console.log("Error hereeee");
    res.status(400).send("Bad request mdfckr");
  }
};