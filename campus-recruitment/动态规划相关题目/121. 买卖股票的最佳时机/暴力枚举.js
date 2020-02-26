/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let len = prices.length;
  let max = 0;
  for (let i = 0; i< len; i++) {
    for (let j = i; j < len; j ++ ) {
      max = Math.max(prices[j] - prices[i], max);
    }
  }
  return max;
};
console.log(maxProfit([7,6,4,3,1]));