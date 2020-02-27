/**
 * @param {number[]} nums
 * @return {number}
 * [2,3,1,1,4]
 */
var jump = function (nums) {
  let ans = 0;
  let begin = 0;
  let end = 1;
  while (end < nums.length) {
    // 一跳：=》
    // 能跳到最远的 最远 索引
    let temp = 0;
    for (let i = begin; i < end; i++) {
      // 当前这个区间找到最大的一个
      temp = Math.max(temp, i + nums[i]);
    }
    // 作为下一跳的起点
    begin = end;
    end = temp + 1;
    ans++;
  }
  return ans;
};
console.log(jump([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0]));
console.log(jump([4, 1, 1, 3, 1, 1, 1]))