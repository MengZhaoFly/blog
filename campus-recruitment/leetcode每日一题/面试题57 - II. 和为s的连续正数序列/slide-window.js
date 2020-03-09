// 滑动窗口解法
var findContinuousSequence = function(target) {
  let res = new Array(target - 1).fill(null).map((_, i) => i + 1);
  let i = 0, j = 1;
  let t = []
  const sum = (i, j) => {
    // return res.slice(i, j).reduce((a, b) => a + b, 0);
    let sum = 0;
    for (let pos = i; pos < j; pos ++) {
      sum += res[pos];
    }
    return sum;
  }
  while (i < res.length && j < res.length) {
    let tsum = sum(i, j);
    if (tsum === target) {
      t.push(res.slice(i, j));
      i ++;
      continue;
    }
    if (tsum > target) i ++;
    else j ++;
  }
  return t;
}
console.log(findContinuousSequence(15))