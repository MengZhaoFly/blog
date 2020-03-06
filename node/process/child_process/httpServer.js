// httpServer.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(Math.random() + '');
})
// .listen(8080);
process.on('message', (type, tcp) => {
  if (type === 'server') {
    tcp.on('connection', socket => {
      server.emit('connection', socket)
    })
  }
})
console.log('http server has started at 8080, pid: ' + process.pid);
