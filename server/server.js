const fs = require('fs');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    console.log(message);
  });
  // req.connection.remoteAddress;
});
