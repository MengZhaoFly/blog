
// [1, 2, 5]  11
var coinChange = function (coins, amount) {
  // 递归：// 从下往上
  // 以 i 为余额，需要的最小硬币个数 为 x
  // 11余额  Math.min(10余额 + 1, 9余额 + 1, 6余额 + 1)
  // 10余额  Math.min(9余额 + 1, 6余额 + 1, 5余额 + 1)
  // .... 
  // 
  // 0    0

  // dp: 从下往上
  // 0 ~ amount, 需要的 最小硬币个数都保存起来
  let dp = new Array(amount + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;
  // 1 为余额  Math.min(0余额 + 1)                         dp[1]
  // 2 为余额  Math.min(1余额 + 1，0余额 + 1)               dp[2]
  // 3 为余额  Math.min(1余额 + 1，2余额 + 1)               dp[3]
  // 5        Math.min(4余额 + 1，3余额 + 1, 0余额 + 1)     dp[5]
  // 。。。
  // 11余额  Math.min(10余额 + 1, 9余额 + 1, 6余额 + 1)  // 结果
  // 状态转移方程：dp
  for (let i = 1; i < dp.length; i ++) {
    for (let coin of coins) {
      let preCoin = i - coin;
      if (preCoin >= 0) {
        dp[i] = Math.min(dp[i], dp[preCoin] + 1);
      }
    }
  }
  if (dp[amount] === Number.MAX_VALUE) return -1;
  return dp[amount];
}