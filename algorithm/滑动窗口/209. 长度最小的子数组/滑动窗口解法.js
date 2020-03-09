var minSubArrayLen = function (s, nums) {
  let min = Number.MAX_VALUE, sum = 0;
  let start = 0;
  let end = 0;
  for (let i = start; i < nums.length; i++) {
    sum += nums[i];
    while(sum < s && end < nums.length) {
      end ++;
      sum += nums[end];
    }
    if (sum >= s) {
      // console.log(end, i)
      min = Math.min(min, end - i + 1);
      sum = sum - (nums[i] + nums[i + 1])
    }
  }
  return min === Number.MAX_VALUE ? 0 : min;
}
// console.log(minSubArrayLen(7,
//   [2,3,1,2,4,3]))