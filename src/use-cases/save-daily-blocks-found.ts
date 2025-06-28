import axios from "axios";
import { updateOneBlock } from '../db/collections/block_found/update/updateOneBlock';
import { findAllBlocks } from '../db/collections/block_found/get/findAllBlock';
import { QUBIC_XMR_STATS_URL } from "../utils/constants";
import getQubicLatestStats from "./get-qubic-latest-stats";

const interval = 1000 * 10;

const saveDailyBlocksFound = async() => {
  setInterval(async() => {
    console.log("Saving daily blocks: ", new Date().toISOString());
  
    const qubicLatestStats = await getQubicLatestStats()
    const epoch = qubicLatestStats?.data.epoch ?? 0;

    const now = new Date();
    const todayDate = new Date(now);
    if (now.getUTCHours() < 12) {
      todayDate.setUTCDate(todayDate.getUTCDate() - 1);
    }
    const todayDateInISO = todayDate.toISOString();

    let todayBlocksFoundResponse = (await findAllBlocks({ timestamp: todayDateInISO }))?.[0];

    const { data: newStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    const { last_block_found, pool_blocks_found: newBlocksFound } = newStats
    const lastBlockFoundTimestamp = new Date(last_block_found*1000).toISOString()

    //existing  
    if(todayBlocksFoundResponse?._id && status === 200) {
      const currentBlocksFound = todayBlocksFoundResponse.block_found;
      if(newBlocksFound > currentBlocksFound) {
        await updateOneBlock(
          { timestamp: lastBlockFoundTimestamp },
          { block_found: newBlocksFound, epoch, timestamp: lastBlockFoundTimestamp }
        );
      }
    }

    //non-existing
    else {
      await updateOneBlock(
        { timestamp: todayDateInISO },
        { block_found: newBlocksFound, epoch, timestamp: todayDateInISO }
      );
    }
  }, interval)
}

export default saveDailyBlocksFound;