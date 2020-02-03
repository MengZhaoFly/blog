const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const maxLine = 2;
let input = [];
function solution(input) {
  let arr = input[0].split(' ');
  arr.pop();
  let len = arr.length;
  let k = parseInt(input[1]);
  // 2->1->4->3->5
  // k  = 2
  // 01 23 4
  // 2->1->4->3->5
  // k = 4
  // 012345  -> 3210
  // 
  for (let i = 0; i < Math.floor(len / k); i++) {
    let left = i * k;  // 0 2 4
    let right = (i * k) + k - 1 // 2 4 6  -> 1 3 5
    while(left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr.join('->')
}
rl.on('line', (line) => {
  input.push(line);
  if (input.length === maxLine) {
    console.log(solution(input));
    rl.close();
  }
})