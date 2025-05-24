export const findOneHashrate = async() => {
  return await global.hashratesCollection.findOne();
}
