// [7,1,5,3,6,4]
// 7 1 
// 1 5   4
// 5 3   
// 3 6   3
// 6 4   
// 7
// 可能多的交易
var maxProfit = function(prices) {
  let res = 0;
  for (let i = 0; i < prices.length - 1; i ++) {
    let profit = prices[i + 1] - prices[i];
    if (profit > 0) {
      res += profit;
    }
  }
  return res;
}
