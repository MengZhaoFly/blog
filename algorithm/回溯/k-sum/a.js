/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var ksum = function (nums, k, sum) {
  let list = []
  var backtrack = function (templist = [], start = 0) {
    if (templist.length === k) {
      if (templist.reduce((a, b) => a + b, 0) === sum) {
        list.push(templist);
      }
      return;
    }
    for (let i = start; i < nums.length; i++) {
      let num = nums[i];
      templist.push(num);
      backtrack(templist.slice(0), i + 1);
      templist.pop();
    }
  }
  backtrack()
  return list;
};

console.log(ksum([1, 2, 3, 4, 5, 6],3, 10))