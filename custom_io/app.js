const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  //   res.send('<h1>Hello World</h1>');
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지 전송
//   socket.broadcast.emit('h1, everybody! 방금 접속한 사람 말고 안녕!');

  // 클라이언트가 chat message라는 이벤트로 메시지를 보내는 경우
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    // console.log('message : ', msg);
  });

  // 접속 종료 시
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
