// 
var jump = function (nums) {
  let ans = 0;
  let begin = 0;
  let end = 1;
  while(end < nums.length) {
    // 本跳最远的 索引
    let temp = 0;
    for (let i = begin; i < end; i ++) {
      temp = Math.max(temp, nums[i] + i)
    }
    begin = end;
    end = temp + 1;
    ans ++;
  }
  return ans;
}