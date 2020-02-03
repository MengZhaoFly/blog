/**

*/
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const maxLine = 2;
let input = [];
function parse(str) {
  const arr = str.split('+');
  const a = parseInt(arr[0]);
  let b;
  if (arr[1] === '1') {
    b = 1;
  } else {
    b = parseInt(arr[1].slice(0, -1));
  }
  return {a, b}
}
function solution(input) {
  const num1 = parse(input[0]);
  const num2 = parse(input[1]);
  return `${num1.a * num2.a - num1.b * num2.b}+${num1.b*num2.a + num1.a*num2.b}i`
}
rl.on('line', (line) => {
  input.push(line);
  if (input.length === maxLine) {
    console.log(solution(input));
    rl.close();
  }
})