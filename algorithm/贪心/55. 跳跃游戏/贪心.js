/**
 * @param {number[]} nums
 * @return {boolean}
 * 尽力跳，所有的跳数都看一下：如果我能到达某一格，那么左侧的所有位置，我都可以到达
 */
var canJump = function(nums) {
  let maxEnd = 0;
  for (let i = 0; i < nums.length; i ++) {
    if (i > maxEnd) return false;
    let iEnd = i + nums[i]
    maxEnd = Math.max(iEnd, maxEnd);
    if (maxEnd >= nums.length) break;
  }
  return true;
};