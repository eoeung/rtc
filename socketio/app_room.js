const app = require('express')();
const server = require('http').createServer(app);
// http server를 socket.io server로 업그레이드한다.
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index_room.html');
});

// namespace /chat에 접속
const chat = io.of('/chat').on('connection', function (socket) {
  socket.on('chat message', function (data) {
    console.log('message from client: ', data);

    const name = (socket.name = data.name);
    const room = (socket.room = data.room);

    // room에 join
    socket.join(room);
    // room에 join되어 있는 클라이언트에게 메시지 전송
    chat.to(room).emit('chat message', data.msg);
  });
});

// 클라이언트가 전송한 메시지 수신 : on 메소드 사용

server.listen(3000, function () {
  console.log('Socket IO server listening on port 3000');
});
