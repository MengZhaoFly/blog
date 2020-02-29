// [2,2,1,1,1,2,2]     2
// [2,2,1,1](统计2 || 1) 1    [1,2,2]  2
// [2,2] 2 [1,1] 1
// [2] 2 [2] 2


var majorityElement = function(nums) {
  // left, right 大于 n / 2 的元素
  function help(left, right) {
    if (left === right) {
      return nums[left];
    }
    let mid = Math.floor((right - left) / 2) + left;
    let leftNum = help(left, mid);
    let rightNum = help(mid + 1, right);
    if (leftNum === rightNum) return leftNum;
    let leftCount = count(nums, leftNum, left, mid);
    let rightCount = count(nums, rightNum, mid + 1, right);
    return leftCount > rightCount ? leftNum : rightNum;
  }
  return help(0, nums.length - 1);
}
function count(nums, num, i, j) {
  let c = 0;
  for (let pos = i; pos <= j; pos ++) {
    if (nums[pos] === num) {
      c ++;
    }
  }
  return c;
}
console.log(majorityElement([3,2,3]))

