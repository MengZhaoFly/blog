//  nums: [10,9,2,5,3,7,101,18]
//  dp: [1, 1,1,2,2,3,4,4]
// 可以组合在一起：7 > (2, 3, 5) Math.max(2, 3, 5) + 1
// dp[i]: 以 i 结尾（0 ～ i）最长的递增子序列
// dp[i] = ? nums[i] > nums[0] ~ nums[i]
var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1);
  let maxRes = 1;
  for (let i = 1; i < nums.length; i ++) {
    let res = 0;
    for (let j = 0; j < i; j ++) {
      if (nums[i] > nums[j]) {
        res = Math.max(dp[j], res)
      }
    }
    dp[i] = res + 1; // ???
    maxRes = Math.max(maxRes, dp[i])
  }
  return maxRes;
}
console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))


