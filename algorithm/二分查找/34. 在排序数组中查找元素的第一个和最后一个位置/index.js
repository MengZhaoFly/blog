/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let len = nums.length;
  if (len == 0) {
    return [-1, -1];
  }

  let firstPosition = findFirstPosition(nums, target);
  if (firstPosition == -1) {
    return [-1, -1];
  }

  let lastPosition = findLastPosition(nums, target);
  return [firstPosition, lastPosition]
};
var findFirstPosition = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((right - left) / 2) + left
    // console.log(left, right, mid)
    // 小于一定不是解
    if (nums[mid] < target) {
      // 下一轮搜索区间是 [mid + 1, right]
      left = mid + 1;
    } else {
      // > 或者 = 都让区间为：[left, mid]
      right = mid;
    }
  }
  // 3 4 3
  // 退出循环的时候，L === R 没有判断到这个元素
  if (nums[left] == target) {
    return left;
  }
  return -1;
}
var findLastPosition = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    // 8,10
    // 4 5 mid: 4
    let mid = Math.ceil((right - left) / 2) + left
    console.log(left, right, mid)
    // 大于一定不是解
    if (nums[mid] > target) {
      // 下一轮搜索区间是 [left, mid - 1]
      right = mid - 1;
    } else {
      // 小于等于 都让区间 [mid, right]
      // 让 判断的那个元素（目标）分到 右区间来
      left = mid;
    }
  }
  // 向上取整是能够 判断到 
  if (nums[left] == target) {
    return left;
  }
  return -1;
}