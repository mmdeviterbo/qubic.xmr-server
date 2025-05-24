import axios from "axios";
import { QUBIC_XMR_STATS_URL } from "../utils/constants";
import { findOneHashrate } from '../db/collections/peak_hashrate/get/findOne';
import { updateOneHashrate } from '../db/collections/peak_hashrate/update/updateOne';

const interval = 1000 * 5;

const saveHighestHashrate = async() => {
  let highestHashrateResponse = await findOneHashrate();
  setInterval(async() => {
    const { data: qubicXmrStats, status } = await axios.get(QUBIC_XMR_STATS_URL);
    if(status === 200) {
      if(qubicXmrStats?.pool_hashrate > highestHashrateResponse!.highest_hashrate ) {
        highestHashrateResponse = await updateOneHashrate(qubicXmrStats?.pool_hashrate);
      }
    }
  }, interval)
}

export default saveHighestHashrate;