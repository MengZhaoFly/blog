
// [4,5,6,7,0,1,2]
// [6,7,1,2,4,5,6]
// nums[start] nums[mid] nums[end] target 可能存在的范围
var search = function (nums, target) {
  let start = 0, end = nums.length - 1;
  while(start <= end) {
    let mid = Math.floor((end - start) / 2) + start;
    console.log(start, mid, end)
    if (nums[mid] === target) {
      return mid;
    }
    // 前半段有序
    // [0,1] start = 0 end = 1  mid = 0
    if (nums[start] <= nums[mid]) {
      // [start...< target <... mid]
      if (nums[start] <= target && target < nums[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      // [mid target end]
      if (target <= nums[end] && target > nums[mid]) {
        start = mid + 1;
      } else {
        end = mid - 1
      }
    }
  }
  return -1;
}
console.log(search([3,4,5,6,1,2], 2))
