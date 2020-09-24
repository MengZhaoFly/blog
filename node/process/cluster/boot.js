/**
 * 简单的进程守护器
 */
const cluster = require('cluster');

if (cluster.isMaster) {
  // console.log(require('os').cpus())
  // require('os').cpus().length / 2
  for (let i = 0; i < 1; i++) {
    createWorker();
  }

  cluster.on('exit', function () {
    setTimeout(() => {
      createWorker()
    }, 5000)
  })

  function createWorker() {
    // 创建子进程并进行心跳监控
    var worker = cluster.fork();
    var missed = 0;// 没有回应的ping次数

    // 心跳
    var timer = setInterval(function () {

      // 三次没回应，杀之
      if (missed == 3) {
        clearInterval(timer);
        console.log(worker.process.pid + ' has become a zombie!');
        process.kill(worker.process.pid);
        return;
      }
      // 开始心跳
      missed++;
      worker.send('ping#' + worker.process.pid);
    }, 10000);

    worker.on('message', function (msg) {
      // 确认心跳回应。
      if (msg == 'pong#' + worker.process.pid) {
        missed--;
      }
    });

    // 挂了就没必要再进行心跳了
    worker.on('exit', function () {
      clearInterval(timer);
    });
  }

} else {
  // 当进程出现会崩溃的错误
  process.on('uncaughtException', function (err) {
    // 这里可以做写日志的操作
    console.log('err', err);
    // 退出进程
    process.exit(1);
  });

  // 回应心跳信息
  process.on('message', function (msg) {
    if (msg == 'ping#' + process.pid) {
      process.send('pong#' + process.pid);
    }
  });

  let watchMemory = setInterval(() => {
    // 内存使用过多，自杀
    console.log(process.memoryUsage().rss)
    if (process.memoryUsage().rss > 52428800) {
      console.log('exit')
      process.exit(1);
    }
  }, 5000);
  require('./app')
}