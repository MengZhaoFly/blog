/**
 * @param {number[]} nums
 * @return {number}
 */
//  [4,5,6,7,0,1,2]   二分
var findMin = function (nums) {
  let low = 0, high = nums.length - 1;
  // 0 6 3
  // 4 6 1 + 4 5
  // 4 5 4
  // 4 4
  while (low < high) {
    let mid = Math.floor((high - low) / 2) + low
    if (nums[mid] > nums[high]) {
      low = mid + 1;
    }
    else if (nums[mid] === nums[high]){
      low = low + 1;
      // high = high - 1
    }  // [1, 1, 1, 0, 1]  [0, 1, 1, 1, 1] {}
    else {
      high = mid;
    }
  }
  return nums[high];
};