export const updateOneHashrate = async(newHighestHashrate: number) => {
  return await global.hashratesCollection.findOneAndUpdate(
    { highest_hashrate: { $lt: newHighestHashrate } },
    { $set: { highest_hashrate: newHighestHashrate, timestamp: new Date().toISOString() } },      
    { returnDocument: 'after' }
  )
}
