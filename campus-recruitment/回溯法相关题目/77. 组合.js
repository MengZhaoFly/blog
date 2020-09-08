/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  let list = [];
  let nums = new Array(n).fill(null).map((_, i) => i + 1);
  backtrack(nums, k, list)
  return list
};
var backtrack = function(nums, k, res, templist = [], start = 0) {
if (templist.length === k) {
  res.push([...templist]);
  return;
}
for (let i = start; i < nums.length; i ++) {
  let num = nums[i];
  templist.push(num);
  backtrack(nums, k, res, templist, i + 1);
  templist.pop();
}
}