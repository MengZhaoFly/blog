/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMin = function(nums) {
  let len = nums.length;
  if(len == 0)  return 0;
  let low = 0, high = len - 1;
  while(low < high) {
      let mid = low + Math.floor((high-low)/2);
      if(nums[mid] > nums[high]) {   // [4,5,6,1,2]
          low = mid + 1;
      } else if(nums[mid] == nums[high]) {  // [1,0,1,1,1] 或者 [1,1,1,0,1]
          // high = high - 1;
          low = low + 1
      } else {      // [1,2,3,4,6]
          high = mid;
      }
  }
  return nums[low];

};