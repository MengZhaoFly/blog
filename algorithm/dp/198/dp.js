// [1, 2, 3, 1]
// [1]  =>   [1]
// [1, 2] => [1, 2]
// [1, 2, 3] => [1, 2, 4]
// [1, 2, 3, 1] => [1, 2, 4, 3]  max: 4


// [2, 7, 9, 3, 1]
// dp: [2, 7, 11, 10, 12]
// 圈：偷最后一间房屋，不能进入第一间房屋  dp:  [2, 7, 11(9 + 2), 10, 8]
// dp[i]:  0 ~ i 区间能偷盗的最大金额
var rob = function(nums) {
  let len = nums.length;
  if (len === 0) return 0;
  if (len < 3) return Math.max(...nums);
  let dp = new Array(len).fill(0);
  dp[0] = nums[0];
  dp[1] = nums[1];
  dp[2] = nums[2] + dp[0];
  for (let i = 3; i < nums.length; i ++) {
    dp[i] = Math.max(...dp.slice(0, i -1)) + nums[i];
  }
  return Math.max(...dp);
}
console.log(rob([1, 2, 3, 1]))
