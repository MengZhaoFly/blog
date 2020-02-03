const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
function isMUp(year) {
  if (year % 400 === 0) {
    return true;
  }
  return year % 4 === 0 && year % 100 !== 0;
}
function solution(str) {
  const arr = str.split('-');
  const y = parseInt(arr[0]);
  const m = parseInt(arr[1]);
  const d = parseInt(arr[2]);
  // 2
  // 3 
  // 1
  const map = [
    0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ]
  let res = 0;
  if (isMUp(y)) {
    map[2] = 29;
  }
  for (let i = 1; i < m; i ++) {
    res += map[i]
  }
  res += d
  return res;

}
rl.on('line', (line) => {
  console.log(solution(line));
})