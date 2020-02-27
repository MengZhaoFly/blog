/**
 * @param {number} n
 * @return {number}
 * 定义函数f(n) n：1 ～ n n个数字。
 * 返回以 n 为输入的二叉树个数。
 * 我们知道根的左边有i−1 个数，而根的右边有n−i 个数。
 * 那么左边二叉树的个数自然就是f(i−1)，而右边二叉树的个数自然就是f(n−i)
 */
var numTrees = function (n) {
  let dp = new Array(n + 1).fill(null);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i < dp.length; i ++) {
    for (let j = 1; j <= i; j ++)
    dp[i] += dp[j - 1] * dp[i - j]
  }
  return dp[n]
};
console.log(numTrees(3))