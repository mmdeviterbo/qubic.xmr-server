export const findAllBlocks = async() => {
  const data = await global.blocksCollection.find();
  return await data.toArray();
}
