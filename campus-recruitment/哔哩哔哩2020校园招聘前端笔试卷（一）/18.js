const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const maxLine = 3;
let input = [];
function solution(input) {
  const arr = input[1].split(' ').map(e => parseInt(e))
  const sum = parseInt(input[2]);
  const length = arr.length;
  let i = 0;
  let j = length - 1;
  while (i < j) {
    let res = arr[i] + arr[j];
    if (res === sum) return `${arr[i]} ${arr[j]}`;
    if (res > sum) {
      j--;
    }
    if (res < sum) {
      i++;
    }
  }
  return 'notfound';
}
rl.on('line', (line) => {
  input.push(line);
  if (input.length === maxLine) {
    console.log(solution(input));
    rl.close();
  }
})