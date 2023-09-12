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
io.on('connection', function (socket) {

});

// 클라이언트가 전송한 메시지 수신 : on 메소드 사용


server.listen(3000, function () {
  console.log('Socket IO server listening on port 3000');
});
