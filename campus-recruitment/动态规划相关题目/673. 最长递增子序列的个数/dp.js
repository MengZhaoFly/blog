/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
  if (nums.length == 0) {
    return 0;
  }

  let dp = new Array(nums.length).fill(1);
  let combination = new Array(nums.length).fill(1);

  let max = 1, res = 0;

  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) { //如果+1长于当前LIS 则组合数不变
          dp[i] = dp[j] + 1;
          combination[i] = combination[j];
        } else if (dp[j] + 1 == dp[i]) { //如果+1等于当前LIS 则说明找到了新组合
          combination[i] += combination[j];
        }
      }
    }
    max = Math.max(max, dp[i]);
  }

  for (let i = 0; i < nums.length; i++)
    if (dp[i] == max) res += combination[i];
  return res;
};
console.log(findNumberOfLIS([1,3,5,4,7]))