// master.js
// 多核 cpu，启动多个进程，每个进程都监听 8080 端口，那样 用户访问 127.0.0.1:8080
// 这样 启动 多个 cpu 来干活
// 1. httpserver.js  listen(8080)
// 0 ~ cpu.length fork(httpserver.js)
// 多个进程不能监听一个端口号
const { fork } = require('child_process');
const cpus = require('os').cpus();
const net = require('net');
const server = net.createServer();
// const logWorker = fork('./log.js');

// for (let i = 0, len = cpus.length - 1; i < len; i++) {
//   const worker = fork('./fib.js');
//   worker.send(Math.floor(Math.random() * 10 + 4)); // 要计算的num
//   worker.on('message', (data) => { // 计算后返回的结果
//     logWorker.send(data); // 将结果发送给输出进程
//   })
// }

server.listen(8080, () => {
  for (let i = 0, len = cpus.length - 1; i < len; i++) {
    const worker = fork('./httpServer1.js');
    // server.on('connection', socket => {
      
    // })
    worker.send('server', server);
  }
})
