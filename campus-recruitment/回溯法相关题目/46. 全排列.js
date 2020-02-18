
var backtrack = function(nums, templist, resList) {
  if (templist.length === nums.length) {
    // 组合好一次结果；
    resList.push([...templist]);
    // 回溯
    return;
  }
  // [1,2,3]
  for (let i = 0; i < nums.length; i ++) {
    let num = nums[i];
    if (templist.includes(num)) continue;
    // 放进去一个
    templist.push(num);
    // 第二步 第三步 第四步 n .... 
    backtrack(nums, templist, resList);
    templist.pop();
  }
}
/**
 * 
 1. []  backtrack
 2. [1]  [backtrack, backtrack]
 3. [1, 1]   [backtrack, backtrack, backtrack]
 4. [1, 1, 2] [backtrack, backtrack, backtrack]
 */
var permute = function(nums) {
  let res = [];
  backtrack(nums, [], res);
  return res;
}
console.log(permute([1,2,3]));