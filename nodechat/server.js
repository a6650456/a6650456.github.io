var express = require('express');
var app = express();
var http = require('http').Server(app);
//io挂载express服务器
var io = require('socket.io')(http);
var path = require('path');

//在线人数统计
var onlineCount = 0;
app.use(express.static(__dirname));

app.get('/index.html',function(require,response){
    response.sendFile('index.html');
});
io.on('connection',function(socket){
    console.log('a user connected');

    io.emit('connected',++onlineCount);

    socket.on('disconnect',function(){
        console.log('user disconnectd');
        io.emit('disconnect',--onlineCount);
        console.log(onlineCount);
    });
    
    socket.on('message',function(message){
        //给客户端发送消息
        io.emit('message',message);

    });
});
var server = http.listen(4000,function(){
    console.log("server is running");
});