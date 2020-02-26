/**
 * @param {number} n
 * @return {number}
 * 定义函数f(n) n：1 ～ n n个数字。
 * 返回以 n 为输入的二叉树个数。
 * 我们知道根的左边有i−1 个数，而根的右边有n−i 个数。
 * 那么左边二叉树的个数自然就是f(i−1)，而右边二叉树的个数自然就是f(n−i)
 */
var numTrees = function (n) {
  if (n == 0 || n == 1) return 1;
  let res = 0;
  for (let j = 1; j < n + 1; j++) {
    // 需要乘法
    // 笛卡尔乘积，A={a,b}, B={0,1,2}，则A×B={(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}
    // 即 每个左子树可以 和 每个右子树 组合一次
    res += numTrees(j - 1) * numTrees(n - j)
  }
  return res;
};
console.log(numTrees(4));