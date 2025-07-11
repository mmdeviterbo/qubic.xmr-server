export const updateOneHashrate = async(newHighestHashrate: number, epoch: number) => {
  return await global.hashratesCollection.findOneAndUpdate(
    { epoch },
    { $set: { max_hashrate: newHighestHashrate, epoch, timestamp: new Date().toISOString() } },      
    { upsert: true },
  )
}
