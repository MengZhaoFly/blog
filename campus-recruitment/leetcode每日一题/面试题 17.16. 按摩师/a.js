/**
 * @param {number[]} nums
 * @return {number}
 */
var massage = function(nums) {
  let len = nums.length;
  let dp = new Array(len).fill(0);
  dp[0] = nums[0];
  let res = dp[0];
  for (let i = 1; i < len; i ++) {
    let max = 0;
    for (let j = 0; j < i - 1; j ++) {
      max = Math.max(max, dp[j]);
    }
    dp[i] = max + nums[i];
    res = Math.max(res, dp[i]);
  }
  // console.log(dp);
  return res;
};
// console.log(massage([2,1,4,5,3,1,1,3]))