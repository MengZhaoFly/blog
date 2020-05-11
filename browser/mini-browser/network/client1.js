// 客户端：xhr
const net = require('net');
const client = net.createConnection({ port: 8088 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('POST / HTTP/1.1\r\n');
  client.write('HOST: 127.0.0.1\r\n');
  client.write('Content-Length: 9\r\n');
  client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  client.write('\r\n');
  client.write('name=89');
  client.write('\r\n');
});
client.on('data', (data) => {
  console.log('收到', data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
