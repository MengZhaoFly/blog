
// [5,7,7,8,8,10]  // 8
var searchRange = function (nums, target) {
  let len = nums.length;
  if (len == 0) {
    return [-1, -1];
  }

  let fPosition = firstPosition(nums, target);
  if (fPosition == -1) {
    return [-1, -1];
  }

  let lPosition = lastPosition(nums, target);
  return [fPosition, lPosition]
};
var firstPosition = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] < target) {
      left = mid + 1;
      // [mid + 1, right]
    } else {
      // > || = 都让他  [left, mid]
      // [8, 8, 10] 
      // [8,8,8,8,8, 8]
      // [8,8,8,8]
      right = mid;
    }
  }
  if (nums[left] === target) return left;
  return -1;
}
var lastPosition = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = Math.ceil((right - left) / 2) + left;
    // 3 4 3
    if (nums[mid] > target) {
      right = mid - 1;
      // [left, mid - 1]
    } else {
      // < || = 都让他  [mid, right]
      // !!!!!  left ！== right
      left = mid;
    }
  }
  return left;
}
console.log(lastPosition([8,8,8,8,10], 8))