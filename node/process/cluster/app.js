const http = require('http');
let t = [];
// console.log(11112222);
module.exports = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  // let html = require('fs').readFileSync('./123.pdf')
  // t.push(html);
  res.end('hello world');
  // while (true) { }
}).listen(3000, () => {
  console.log('listened 3000')
})