// 通过 http 创建创建一个服务器实例
require('http').createServer((req, res) => {
  for (var i = 0; i < 1000000; i++) {}
  // 返回一段文本
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('经过一个耗时操作，这是返回的一段文本\n')
}).listen(5000, '127.0.0.1', () => console.log('服务启动了'))