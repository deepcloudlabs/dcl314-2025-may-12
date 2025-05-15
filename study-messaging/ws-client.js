const io = require('socket.io-client');

const ws_client = io('http://localhost:5555');
ws_client.on('connect', (session) => {
    console.log('Connected to server the server...');
    ws_client.on('ticker', (data) => {

        console.log(data);
    });
})