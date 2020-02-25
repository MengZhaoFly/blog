/**
 * @param {number[]} nums
 * @return {number}
 * dp[i] 的值代表 nums 前 ii 个数字的最长子序列长度
 */
/* 
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
*/
var lengthOfLIS = function (nums) {
  let cached = {};
  if (!nums.length) return 0;
  function searchLis(num, index) {
    if (cached[index] !== undefined) return cached[index]
    if (index === 0) return 1;
    let res = 1;
    for (let j = 0; j < index; j ++) {
      if (nums[j] < num) {
        res = Math.max(res, 1 + searchLis(nums[j], j))
      }
    }
    cached[index] = res;
    return res;
  }
  let res = -1;
  for (let i = 0; i < nums.length; i ++) {
    res = Math.max(res, searchLis(nums[i], i))
  }
  return res;
}