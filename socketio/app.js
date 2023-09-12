const app = require('express')();
const server = require('http').createServer(app);
// http server를 socket.io server로 업그레이드한다.
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// connection event handler
// io 객체는 연결된 전체 클라이언트와의 interaction 객체
// socket 객체는 개별 클라이언트와 interaction 객체
// 클라이언트가 전송한 메시지 수신 : on 메소드 사용
io.on('connection', function (socket) {
  // 접속한 클라이언트의 정보가 수신 되면
  socket.on('login', function (data) {
    console.log(
      'Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid
    );

    // socket에 클라이언트 정보를 저장
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지 전송
    io.emit('login', data.name);
  });

  // 클라이언트로부터 메시지 수신시
  socket.on('chat', function (data) {
    console.log('Message from %s: %s', socket.name, data.msg);

    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 클라이언트 제외 모든 클라이언트에게 메시지 전송
    socket.broadcast.emit('chat', msg);

    // 메시지를 전송한 클라이언트만 메시지 전송
    // socket.emit('s2c chat', msg);

    // 접속된 모든 클라이언트에게 메시지 전송
    // io.emit('s2c chat', msg);

    // 특정 클라이언트에게만 메시지 전송
    // io.to(id).emit('s2c chat', msg);
  });

  // 서버와 클라이언트 연결 강제로 끊기
  socket.on('forceDisconnect', function () {
    socket.disconnect();
  });

  socket.on('disconnect', function () {
    console.log('user disconnected: ' + socket.name);
  });
});

server.listen(3000, function () {
  console.log('Socket IO server listening on port 3000');
});
