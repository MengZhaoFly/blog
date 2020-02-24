/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // dp[i] = x 表示，当目标金额为 i 时，至少需要 x 枚硬币。
  // 后续取最小值
  let dp = new Array(amount + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;
  for (let i = 0; i < dp.length; i ++) {
    for (let coin of coins) {
      let preCoin = i - coin;
      if (preCoin >= 0) {
        dp[i] = Math.min(dp[i], dp[preCoin]) + 1;
      }
    }
  }
  // 无法进入
  if (dp[amount] === Number.MAX_VALUE) return -1;
  return dp[amount]
}
console.log(coinChange([2, 3], 5))
