// [2,1,4,5,3,1,1,3]
// 递推公式（base case）->  所有的结果计算
// base case: [2, 1]     ->  所有的结果计算
// [2, 1, 4]: [2, 1, 6] 
// [2,1,4,5]: [2, 1, 6, 5这个数：5 + 2, ] 
// nums:[2,1,4,5,3]: dp:[2,1,6,7]
// 5[3]  [0, 3-2]:找到一个最大的，和 3 组合在一起
// dp[i]: 从 nums 0 ~ i 组合的最大预约数
// dp[i] = nums[i] + Math.max([dp[0], dp[i - 2]])
// 0 ~ nums.length: 组合的最大预约数
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
    dp[i] = nums[i] + max;
    res = Math.max(dp[i], max);
  }
  return res;
}