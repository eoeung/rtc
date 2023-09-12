const websocket = require('ws');
const wss = new websocket.WebSocketServer({ port: 3000 });

// 연결이 수립되면 클라이언트에 메시지를 전송하고, 클라이언트로부터 메시지 수신
wss.on('connection', function (ws) {
  ws.send('Hello! I am server.');
  ws.on('message', function (message) {
    console.log('Received: %s', message);
  });
});

// index.html을 직접 열면 됨