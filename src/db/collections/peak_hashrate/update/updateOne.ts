export const updateOneHashrate = async(newHighestHashrate: number, epoch: number) => {
  return await global.hashratesCollection.findOneAndUpdate(
    { highest_hashrate: { $lt: newHighestHashrate } },
    { $set: { highest_hashrate: newHighestHashrate, epoch, timestamp: new Date().toISOString() } },      
    { returnDocument: 'after' }
  )
}
