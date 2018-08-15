var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 2222;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var messages = [];

io.on('connection', function(socket){
  io.emit('chat history', messages);
  socket.on('chat message', function(msg){
    messages.push(msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
