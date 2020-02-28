//                  [1,3,5,4,7]
//                  [1,1,1,1,1]
// 最长递增子序列长度：    [1,2,3,3,4]  dp[i]: 0 ~ i 
// 4 能够 和 3 分别组合一次
// 分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
//                    [1,2,3,3,4]

//                    dp[4] = dp[3] + 1;  能够组成新的组合
// combine: [1,1,1,1,1]
// combine[i] = combine[i] + combine[j]
// 最长递增子序列的个数: [1,2,1,1,2] 2+2  
var findNumberOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1);  // 0 ~ i 最长递增子序列
  let combine = new Array(nums.length).fill(1);  // 0 ~ i 最长递增子序列组合个数
  let max = 1; let res = 0;
  for (let i = 0; i < dp.length; i ++) {
    for (let j = 0; j < i; j ++) {
      if (nums[i] > nums[j]) {
        // 才有必要更新
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          combine[i] = combine[j];
        } else if (dp[j] + 1 == dp[i]) {
          combine[i] += combine[j]
        }
      }
    }
    max = Math.max(max, dp[i])
  }
  for (let i = 0; i < nums.length; i ++) if (max === dp[i]) res += combine[i]
  return res;
}
// console.log(findNumberOfLIS([2,2,2,2,2]));