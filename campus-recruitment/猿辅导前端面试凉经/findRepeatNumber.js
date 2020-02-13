/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  let hash = {};
  for (let val of nums) {
    if (hash[val] !== undefined) {
      return val;
    } else {
      hash[val] = true;
    }
  }
};