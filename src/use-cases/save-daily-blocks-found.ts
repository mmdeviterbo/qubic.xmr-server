import axios from "axios";
import { updateOneBlock } from '../db/collections/blocks_found/update/updateOneBlock';
import { findAllBlocks } from '../db/collections/blocks_found/get/findAllBlocks';
import { QUBIC_XMR_STATS_URL } from "../utils/constants";
import getQubicLatestStats from "./get-qubic-latest-stats";

const interval = 1000 * 10;

const saveDailyBlocksFound = async() => {
  setInterval(async() => {
    console.log("Saving daily blocks: ", new Date().toISOString());
  
    const now = new Date();
    const todayDate = new Date(now);
    if (now.getUTCHours() < 12) {
      todayDate.setUTCDate(todayDate.getUTCDate() - 1);
    }
    const todayDateInISO = todayDate.toISOString();

    let todayBlocksFoundResponse = (await findAllBlocks({ timestamp: todayDateInISO }))?.[0];

    const { data: newStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    const { pool_blocks_found: newBlocksFound } = newStats

    const qubicLatestStats = await getQubicLatestStats()
    const epoch = qubicLatestStats?.data?.epoch ? qubicLatestStats?.data?.epoch : todayBlocksFoundResponse?.epoch;

    //existing  
    if(todayBlocksFoundResponse?._id && status === 200) {
      if(newBlocksFound > todayBlocksFoundResponse.blocks_found) {
        await updateOneBlock(
          { timestamp: todayDateInISO },
          { blocks_found: newBlocksFound, epoch, timestamp: todayDateInISO }
        );
      } 

      else if(todayBlocksFoundResponse.epoch !== epoch) {
        await updateOneBlock(
          { timestamp: todayDateInISO },
          { blocks_found: newBlocksFound, epoch, timestamp: todayDateInISO }
        );
      }
    }

    //non-existing
    else {
      await updateOneBlock(
        { timestamp: todayDateInISO },
        { blocks_found: newBlocksFound, epoch, timestamp: todayDateInISO }
      );
    }
  }, interval)
}

export default saveDailyBlocksFound;