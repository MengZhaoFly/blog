/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (!nums.length) return 0;
  if (nums.length < 3) return Math.max(...nums);
  let dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = nums[1];
  dp[2] = nums[2] + dp[0];
  for (let i = 3; i < nums.length; i ++) {
    dp[i] = nums[i] + Math.max(...dp.slice(0, i - 1))
  }
  return Math.max(...dp);
};
console.log()