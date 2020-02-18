
var backtrack = function(nums, templist, resList, target, start) {
  // 其他限制  templist.length > nums.length ??  X
  if (templist.reduce((a, b) => a + b, 0) > target) return false;
  // 找到
  if (templist.reduce((a, b) => a + b, 0) === target) {
    // 去重
    resList.push([...templist]);
    return;
  }
  for (let i = start; i < nums.length; i ++) {
    let num = nums[i];
    templist.push(num);
    backtrack(nums, templist, resList, target, i);
    templist.pop();
  }
}
// [1, 2, 3]  2   [1,2] 13  23
var combinationSum = function(candidates, target) {
  // 
  candidates.sort((a, b) => a -b);
  let res = [];
  backtrack(candidates, [], res, target, 0);
  return res;
}
// console.log(combinationSum([2,3,6,7], 7));

// [2,2,2,2,2,2,2,2,2]