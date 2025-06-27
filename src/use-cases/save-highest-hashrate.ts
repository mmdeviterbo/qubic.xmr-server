import axios from "axios";
import { QUBIC_LATEST_STATS, QUBIC_XMR_STATS_URL } from "../utils/constants";
import { findOneHashrate } from '../db/collections/peak_hashrate/get/findOne';
import { updateOneHashrate } from '../db/collections/peak_hashrate/update/updateOne';

const interval = 1000 * 6;

const saveHighestHashrate = async() => {
  setInterval(async() => {
    console.log("Saving highest hashrates: ", new Date().toISOString());

    let highestHashrateResponse = await findOneHashrate();

    const { data: qubicXmrStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    
    const { data: liveStats } = await axios.get(QUBIC_LATEST_STATS);
    const epoch = liveStats.data?.epoch;

    if(status === 200) {
      if(qubicXmrStats?.pool_hashrate > highestHashrateResponse!.highest_hashrate ) {
        highestHashrateResponse = await updateOneHashrate(qubicXmrStats?.pool_hashrate, epoch);
      }
    }
  }, interval)
}

export default saveHighestHashrate;