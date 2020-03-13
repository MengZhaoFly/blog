const http = require('http');
let i = 0;
http.createServer((req, res) => {
  console.log(i ++);
  res.end('hhhh');
})
.listen(8080, () => {
  console.log('server is running')
})