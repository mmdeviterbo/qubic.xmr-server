import axios from "axios";
import { Block } from "../db/collections/block_found";
import { insertOneBlock } from '../db/collections/block_found/create/insertOneBlock';
import { updateOneBlock } from '../db/collections/block_found/update/updateOneBlock';
import { findOneBlock } from '../db/collections/block_found/get/findOneBlock';
import { QUBIC_XMR_STATS_URL } from "../utils/constants";

const interval = 1000 * 10;

const getBlockParams: Block = {
  block_found: 0, //total blocks found as of today
  timestamp: new Date().toISOString() //id per epoch, utc
}

const saveDailyBlocksFound = async() => {
  let todayBlockFound = await findOneBlock({ timestamp: getBlockParams.timestamp });

  if(!todayBlockFound) {
    const { data: qubicXmrStats }  = await axios.get(QUBIC_XMR_STATS_URL);
    getBlockParams.block_found = qubicXmrStats.pool_blocks_found;
    const _id = await insertOneBlock(getBlockParams);
    if(_id) {
      todayBlockFound = await findOneBlock({ _id });
    }
  }

  setInterval(async() => {
    console.log("Saving daily blocks: ", new Date().toISOString());

    const { data: qubicXmrStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    if(status === 200) {
      const newBlocksFound: number = qubicXmrStats.pool_blocks_found;
      if(newBlocksFound > todayBlockFound!.block_found) {
        todayBlockFound = await updateOneBlock(
          { _id: todayBlockFound!._id },
          { block_found: newBlocksFound }
        );
      }
    }
  }, interval)
}

export default saveDailyBlocksFound;