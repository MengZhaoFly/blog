/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var backtrack = function(nums, templist = [], list) {
  if (templist.length === nums.length) {
    list.push([...templist]);
    return false;
  }
  for (let i = 0; i < nums.length; i ++) {
    if (templist.includes(nums[i])) continue;
    templist.push(nums[i]);
    backtrack(nums, templist, list);
    templist.pop();
  }
}
var permute = function(nums) {
    var list = []
    backtrack(nums, [], list);
    return list;
};