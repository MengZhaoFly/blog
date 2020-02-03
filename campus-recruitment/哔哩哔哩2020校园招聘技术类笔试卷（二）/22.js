/**

*/
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
function isMonthUp(year) {
  if (year % 400 === 0) {
    return true;
  }
  return year % 4 === 0 && year % 100 !== 0;
}
function solution(input) {
  const arr = input.split('-')
  const y = parseInt(arr[0]);
  const m = parseInt(arr[1]);
  const d = parseInt(arr[2]);
  // 2-3
  // 10-10 10个月份距离的天数 + 10天
  const map = [
    0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ]
  //[1, 2, 3, 4, 5]
  if (isMonthUp(y)) {
    map[2] = 29;
  }
  let res = 0;
  for (let i = 1; i < m; i ++) {
    res += map[i];
  }
  res += d;
  return res;
}
rl.on('line', (line) => {
  console.log(solution(line));
})