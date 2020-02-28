/**
 * 
 * @param {*} nums 
 * [3, 2, 1, 0, 4]
 * []
 * max = i:0 => 3  i:1 => 3  i:2 => 3 i:3 => 3
 * max > len true
 */
var canJump = function(nums) {
  let max = 0;
  for (let i = 0; i < nums.length; i ++) {
    if (i > max) return false;
    let iEnd = nums[i] + i;
    max = Math.max(iEnd, max);
    if (max >= nums.length) break;
  }
  return true;
}