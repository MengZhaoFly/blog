var maxSubArray = function(nums) {
  if (Array.isArray(nums) && nums.length > 0) {
    let sum = nums[0];
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (sum < 0) {
        sum = nums[i];
      } else {
        sum = sum + nums[i];
      }
      if (sum > max) {
        max = sum;
      }
    }
    return max;
  }
  return 0;
}