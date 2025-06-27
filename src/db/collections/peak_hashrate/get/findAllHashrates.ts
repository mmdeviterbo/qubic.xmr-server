import { Hashrates } from "..";

export const findAllHashrates = async(epoch?: number) => {
  const params: Partial<Hashrates> = {};
  if(epoch) {
    params.epoch = epoch;
  }

  const data = await global.hashratesCollection.find(params);
  const response = await data.toArray();

  return response;
}
