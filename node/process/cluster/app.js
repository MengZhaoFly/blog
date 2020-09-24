const http = require('http');
let t = [];
module.exports = http.createServer((req, res) => {
  let content = require('fs').readFileSync('./index.html');
  t.push(content);
  res.end('hello world');
  // console.log(a);
  // while(true) {}  // 僵尸进程    // 压测

}).listen(3000, () => {
  console.log('listened 3000')
})