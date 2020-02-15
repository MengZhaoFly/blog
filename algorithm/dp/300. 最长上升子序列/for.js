var lengthOfLIS = function (nums) {
  let cached = {};
  if (!nums.length) return 0;
  function searchLis(num, index) {
    if (cached[index] !== undefined) return cached[index]
    if (index === 0) return 1;
    let res = 1;
    for (let j = 0; j < index; j++) {
      if (nums[j] < num) {
        res = Math.max(res, 1 + searchLis(nums[j], j))
      }
    }
    cached[index] = res;
    return res;
  }
  let res = -1;
  for (let i = 0; i < nums.length; i++) {
    res = Math.max(res, searchLis(nums[i], i))
  }
  return res;
}
// O(2 ^ n)。
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))