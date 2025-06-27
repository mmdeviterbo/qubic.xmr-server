export const updateOneHashrate = async(newHighestHashrate: number, epoch: number) => {
  return await global.hashratesCollection.findOneAndUpdate(
    { epoch },
    { $set: { highest_hashrate: newHighestHashrate, epoch, timestamp: new Date().toISOString() } },      
    { returnDocument: 'after', upsert: true },
  )
}
