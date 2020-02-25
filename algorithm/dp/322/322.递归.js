// 缓存
var coinChange = function(coins, amout) {
  let map = {};
  function backtrack(choices, count) {
    if (map[count] !== undefined) return map[count];
    // 归
    if (count === 0) return 0;
    if (count < 0) return -1;
    let res = Number.MAX_VALUE;
    for (let coin of coins) {
      // 从上到小
      let subCoin = backtrack(choices, count - coin);
      if (subCoin === -1) {
        // 不能够组成 amout
        continue;
      }
      // 归 从下 -》上
      let num = subCoin + 1;
      // [1, 2, 5] 随意选一个，产生能够组合成功的最小的硬币个数
      res = Math.min(num, res);
    }
    if (res === Number.MAX_VALUE) {
      map[count] = -1
      return -1;
    }
    map[count] = res
    return res;
  }
  return backtrack(coins, amout);
}
console.log(coinChange([1,2,5], 11))