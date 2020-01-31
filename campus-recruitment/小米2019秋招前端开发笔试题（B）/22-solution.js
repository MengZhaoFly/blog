const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let list = [];
function solution(obj) {
  if (obj.next) {
    if (!(obj.next.length)) {
      solution(obj.next)
    } else {
      list.push(obj.node);
      for (var i = 0; i < obj.next.length; i++) {
        solution(obj.next[i]);
      }
    }
  }
}
rl.on('line', (line) => {
  console.log(line);
  const obj = eval(`o = ${line}`);
  solution(obj);
  console.log(JSON.stringify(list))
  rl.close();
})