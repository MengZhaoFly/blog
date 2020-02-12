/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray = function(nums) {
  let i, k, thisSum, maxSum;
     maxSum = -Number.MAX_VALUE;
     for (let i = 0; i < nums.length; i ++) {
       thisSum = 0;
       for (let k = i; k < nums.length; k ++) {
         thisSum += nums[k];
         if (thisSum > maxSum) {
           maxSum = thisSum;
         }
         // start: i end: k
       }
     }
     return maxSum;
 };