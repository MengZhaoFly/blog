/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (!nums.length) return 0;
  const robHelp = (robNums) => {
    if (robNums.length <= 2) return Math.max(...nums);
    let dp = new Array(robNums.length).fill(0);
    dp[0] = robNums[0];
    dp[1] = robNums[1];
    dp[2] = robNums[2] + dp[0];
    for (let i = 3; i < robNums.length; i ++) {
      dp[i] = robNums[i] + Math.max(...dp.slice(0, i - 1))
    }
    // console.log(robNums, '-', dp);
    return Math.max(...dp);
  }
  const rob1 = robHelp(nums.slice(0, nums.length - 1));
  const rob2 = robHelp(nums.slice(1, nums.length));
  return Math.max(rob1, rob2);
};
console.log(rob([2,7,9,3,1]))