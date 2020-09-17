var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    // 监听客户端发送的 chat 事件
    socket.on('chat', function (chatinfo) {
        // 向当前 socket 发送聊天信息
        socket.emit('chat', chatinfo);
        // 向除了当前 socket 外的所有 socket 发送聊天信息
        socket.broadcast.emit('chat', chatinfo);
    });
});
server.listen(3000, function() {
    console.log('App listening on port 3000!');
});