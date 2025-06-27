import axios from "axios";
import { QUBIC_LATEST_STATS, QUBIC_XMR_STATS_URL } from "../utils/constants";
import { findAllHashrates } from '../db/collections/peak_hashrate/get/findAllHashrates';
import { updateOneHashrate } from '../db/collections/peak_hashrate/update/updateOne';
import getQubicLatestStats from "./get-qubic-latest-stats";

const interval = 1000 * 6;

const saveHighestHashrate = async() => {
  setInterval(async() => {
    console.log("Saving highest hashrates: ", new Date().toISOString());

    const { data: liveStats } = await getQubicLatestStats()
    const epoch = liveStats?.epoch ?? 0;

    const highestHashrateResponse = await findAllHashrates(epoch)?.[0];
    let highest_hashrate = 0;
    if(highestHashrateResponse?._id) {
      highest_hashrate = highestHashrateResponse.highest_hashrate
    }

    const { data: qubicXmrStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    if(status === 200) {
      if(qubicXmrStats?.pool_hashrate > highest_hashrate) {
        await updateOneHashrate(qubicXmrStats?.pool_hashrate, epoch);
      }
    }
  }, interval)
}

export default saveHighestHashrate;