/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // 用当前的值，上一次的值，
  // [10,9,2,5,3,7,101,18]
  // 查找以10(基准数) 为起点的最长子序列
  // 查找以9(基准数) 为起点的最长子序列
  // 查找以2(基准数) 为起点的最长子序列
  // 枚举所有情况，找到最大的子序列
  function lengthofLIS(nums, prev, curpos) {
    if (curpos == nums.length) {
      return 0;
    }
    let taken = 0;
    // 如果当前的数 大于 (基准数)
    if (nums[curpos] > prev) {
      // 可以连接到 最长子序列 后面，长度可以加 1 ，同时往后递归的时候 (基准数)更新一下
      taken = 1 + lengthofLIS(nums, nums[curpos], curpos + 1);
    }
    // 否则 保持基准数不变，往后遍历。
    let nottaken = lengthofLIS(nums, prev, curpos + 1);
    return Math.max(taken, nottaken);
  }
  return lengthofLIS(nums, Number.MIN_VALUE, 0);
};
var lengthOfLIS = function (nums) {
  if (!nums.length) return 0
  let dp = [1];
  let maxRes = 1;
  for (let i = 1; i < nums.length; i ++) {
    let res = 0;
    for (let j = 0; j < i; j ++) {
      if (nums[i] > nums[j]) {
        // 比当前数值小的数可能有很多个，我们要知道哪个数的上升序列 最大
        // 从 j ~ i 这个区间把上升序列 最大 的找出来
        res = Math.max(res, dp[j]);
      }
    }
    dp[i] = res + 1;
    maxRes = Math.max(maxRes, dp[i])
  }
  console.log(dp);
  return maxRes
};
console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));