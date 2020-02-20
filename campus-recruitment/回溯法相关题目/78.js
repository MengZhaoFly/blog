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
  // 什么时候 backtrack 中止？？
  res.push([...templist]);
  // 重复的问题 ？？？
  // nums = [3]
  for(let i = start; i < nums.length; i ++) {
    let num = nums[i];
    templist.push(num);
    backtrack(nums, res, templist, i + 1);
    templist.pop();
  }
  // return undefined
}
console.log(subsets([1,2,3]))