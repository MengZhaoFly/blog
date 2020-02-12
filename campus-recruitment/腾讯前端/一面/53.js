/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
   let max = - Number.MAX_VALUE
   let sum = 0;
   for (let i = 0; i < nums.length; i ++) {
     if (sum < 0) {
       sum = nums[i]
     } else {
       sum += nums[i]
     }
     if (sum > max) {
       max = sum;
     }
   }
   return max;
 }