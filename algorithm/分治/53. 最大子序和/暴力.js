/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  //类似寻找最大最小值的题目，初始值一定要定义成理论上的最小最大值
  let max = Number.MIN_VALUE;
  let numsSize = nums.length
  for (let i = 0; i < numsSize; i++){
    let sum = 0;
    for (let j = i; j < numsSize; j++)
    {
      sum += nums[j];
      if (sum > max) {
        max = sum;
      }
    }
  }
  return max;
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));