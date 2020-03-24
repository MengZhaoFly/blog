const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = 2

 function msToExpirationTime(ms) {
  return ((ms / UNIT_SIZE) | 0) + MAGIC_NUMBER_OFFSET
}

 function expirationTimeToMs(expirationTime) {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE
}

function ceiling(num, precision) {
  // | 0 : 取整
  return (((num / precision) | 0) + 1) * precision
}

function computeExpirationBucket(
  currentTime,
  expirationInMs,
  bucketSizeMs,
) {
  /**
   * ((((currentTime - 2 + 5000 / 10) / 25) | 0) + 1) * 25
   * 以25为单位向上增加的，比如说我们输入10002 - 10026之间，最终得到的结果都是10525，
   * 是为了让非常相近的两次更新得到相同的expirationTime，然后在一次更新中完成
   */
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  )
}

 const LOW_PRIORITY_EXPIRATION = 5000
 const LOW_PRIORITY_BATCH_SIZE = 250
// 普通的异步
 function computeAsyncExpiration(
  currentTime
) {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  )
}
 const __DEV__ = true;
 const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150
 const HIGH_PRIORITY_BATCH_SIZE = 100
//事件触发
 function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  )
}
console.log(computeAsyncExpiration(10002))
console.log(computeAsyncExpiration(10026))