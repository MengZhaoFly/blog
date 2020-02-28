/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) { 
  function help(left, right) {
    if (left === right) {
      return nums[left];
    }
    let mid = Math.floor((right - left) / 2) + left;
    // 左闭 右闭
    let leftNum = help(left, mid);
    let rightNum = help(mid + 1, right);
    if (leftNum === rightNum) return leftNum;
    let leftCount = count(nums, leftNum, left, mid);
    let rightCount = count(nums, rightNum, mid + 1, right);
    return leftCount > rightCount ? leftNum : rightNum;
  }
  return help(0, nums.length - 1);
};
function count(nums, num, left, right) {
  let count = 0;
  for (let i = left; i <= right; i ++) {
    if (nums[i] === num) {
      count ++;
    }
  }
  return count;
}
console.log(majorityElement([2,2,1,1,1,2,2]))