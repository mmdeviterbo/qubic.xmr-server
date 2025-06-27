import axios from "axios";
import { QUBIC_LATEST_STATS } from "../utils/constants";

interface QubicLiveStats {
  data: {
    timestamp: `${number}`,
    circulatingSupply: `${number}`,
    activeAddresses: number,
    price: number,
    marketCap: `${number}`,
    epoch: number,
    currentTick: number,
    ticksInCurrentEpoch: number,
    emptyTicksInCurrentEpoch: number,
    epochTickQuality: number,
    burnedQus: `${number}`
  }
}

const getQubicLatestStats = async(): Promise<QubicLiveStats | null> => {
  try{
    const { data, status } = await axios.get<QubicLiveStats>(QUBIC_LATEST_STATS);
    if(status === 200) {
      return data;
    }
  }catch(error) {
    return null;
  }
}

export default getQubicLatestStats;