/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  //类似寻找最大最小值的题目，初始值一定要定义成理论上的最小最大值
  let max = Number.MIN_VALUE;
  let numsSize = nums.length;
  //dp[i]表示nums中以nums[i]结尾的最大子序和
  let dp = new Array(numsSize).fill(null);
  dp[0] = nums[0];
  result = dp[0];
  for (let i = 1; i < numsSize; i++) {
    // 和前面的组合在一起，还不如自己大，那就断开
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    result = Math.max(result, dp[i]);
  }

  return result;
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))