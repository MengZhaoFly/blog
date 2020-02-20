/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let list = []
    backtrack(nums, list)
    return list;
};
var backtrack = function(nums, res, templist = [], start = 0) {
  res.push([...templist]);
  for (let i = start; i < nums.length; i ++) {
    let num = nums[i];
    templist.push(num);
    backtrack(nums, res, templist, i + 1);
    templist.pop();
  }
}
console.log(subsets([1,2,3]))