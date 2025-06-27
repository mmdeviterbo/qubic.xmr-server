import axios from "axios";
import { Block } from "../db/collections/block_found";
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

    const getBlockParams: Block = {
      block_found: 0, //total blocks found as of today
      timestamp: new Date().toISOString(), //id per epoch, utc,
      epoch: 0,
    }

    let todayBlocksFoundResponse = (await findAllBlocks({ timestamp: getBlockParams.timestamp }))?.[0];
    if(todayBlocksFoundResponse?._id) {
      getBlockParams.block_found = todayBlocksFoundResponse.block_found;
      getBlockParams.timestamp = todayBlocksFoundResponse.timestamp; 
      getBlockParams.epoch = epoch;
    }

    const { data: qubicXmrStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    if(status === 200) {
      const newBlocksFound: number = qubicXmrStats.pool_blocks_found;
      if(newBlocksFound > getBlockParams.block_found) {
        await updateOneBlock(
          { timestamp: getBlockParams.timestamp },
          { block_found: newBlocksFound, epoch, timestamp: getBlockParams.timestamp }
        );
      }
    }
  }, interval)
}

export default saveDailyBlocksFound;