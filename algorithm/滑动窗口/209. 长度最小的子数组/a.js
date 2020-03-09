/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  if (!nums.length) return 0;
  let min = Number.MAX_VALUE;
  for (let i = 0; i < nums.length; i ++) {
    let sum = 0;
    for (let j = i; j < nums.length; j ++) {
      sum += nums[j];
      if (sum >= s) {
        min = Math.min(min, j - i + 1);
        break;
      }
    }
  }
  return min === Number.MAX_VALUE ? 0 : min;
};
// console.log(minSubArrayLen(7,
//   [2,3,1,2,4,3]))