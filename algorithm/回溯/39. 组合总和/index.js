/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var backtrack = function(nums, templist = [], list, target, start) {
  if (templist.reduce((a, b) => a + b, 0) > target) {
    return false;
  }
  if (templist.reduce((a, b) => a + b, 0) === target) {
    list.push([...templist]);
    return false;
  }
  for (let i = start; i < nums.length; i ++) {
    templist.push(nums[i]);
    backtrack(nums, templist, list, target, i);
    templist.pop();
  }
}
var combinationSum = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  var list = []
  backtrack(candidates, [], list, target, 0);
  return list;
};
// console.log(combinationSum([2,3,6,7], 7))