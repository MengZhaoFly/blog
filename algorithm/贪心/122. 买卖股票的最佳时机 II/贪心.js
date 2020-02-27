/**
 * @param {number[]} prices
 * @return {number}
 * 对于 “今天的股价 - 昨天的股价”，得到的结果有 3 种可能：（1）正数（2）0（3）负数。
贪心算法的决策是：只加正数。
 */
var maxProfit = function(prices) {
  let res = 0;
  for (let i = 0; i < prices.length - 1; i ++) {
    let diff = prices[i + 1] - prices[i];
    if (diff > 0) {
      res += diff
    }
  }
  return res;
};
console.log(maxProfit([1,2,3,4]))