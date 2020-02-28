/**
 * @param {number[]} nums
 * @return {number}
 sum累加的模式，sum值既然是做累加操作得到的，那么一旦sum为负或零，累加值必然开始变小，
 这时候再继续累加就没有意义了，于是舍弃，赋值为num继续重新开始。
 ans存放最大值，遍历完返回。
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