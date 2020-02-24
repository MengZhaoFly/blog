/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  function backtrack(choices, count) {
    // 枚举所有的选择
    // 每一次 都可以从 choices 选一个
    if (count === 0) return 0;
    if (count < 0) return -1;
    let res = Number.MAX_VALUE;
    for (let coin of choices) {
      let subCoin = coinChange(choices, count - coin);
      if (subCoin === -1) continue;
      // 不为 -1 代表有解，“归”的过程中 +1，再和当前 的 res 比较，选择一个“个数较小”的解法
      res = Math.min(subCoin + 1, res);
    }
    // 有可能 最后 所有的 subCoin 都为 -1
    if (res === Number.MAX_VALUE) return -1;
    return res;
  }
  return backtrack(coins, amount);
};
console.log(coinChange([1, 2, 5], 11))