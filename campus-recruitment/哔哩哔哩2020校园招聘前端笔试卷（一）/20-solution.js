const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
function solution(step) {
  step = parseInt(step);
  function walk(n) {
    if (n < 1) {
      return 0
    }
    if (n === 1) return 1;
    if (n === 2) return 2;
    return walk(n - 1) + walk(n - 2);
  }
  return walk(step);
}
rl.on('line', (line) => {
  console.log(solution(line))
})