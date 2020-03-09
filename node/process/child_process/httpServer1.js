const http = require('http');


const httpServer = http.createServer((req, res) => {
  console.log(123)
  res.end(Math.random() + '');
})
// req
process.on('message', (type, tcp) => {
  if (type === 'server') {
    tcp.on('connection', socket => {
      httpServer.emit('connection', socket);
    })
  }
})
console.log(process.pid, 'is listen 8080')