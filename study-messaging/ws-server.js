const WebSocket = require('ws');
const webSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

const http = require("http");
const server = http.createServer((req,res)=>{

});

let sessions = [];
const io = require("socket.io")(server, {
    "cors": "*",
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

io.on("connection", (session)=>{
    console.log(`New session is created: ${session.id}`);
    sessions.push(session);
    session.on("disconnect", ()=>{
        console.log(`The session is closed: ${session.id}`);
        sessions = sessions.filter( _ => _.id !==session.id);
    })
});

server.listen(5555,()=>{
    console.log("Server listening on port 5555");
});

webSocket.on("open",()=>{
   console.log("Connected to binance ws server!");
   let totalVolume = 0;
   setInterval(()=>{
       totalVolume = 0;
   },60_000);
   webSocket.on("message", (data)=>{
       const receivedTrade = JSON.parse(data);
       let tradeVolume = Number(receivedTrade.p) * Number(receivedTrade.q);
       totalVolume += tradeVolume;
       let enrichedTrade = {
           price: receivedTrade.p,
           quantity: receivedTrade.q,
           symbol: receivedTrade.s,
           tradeId: receivedTrade.E,
           sequence: receivedTrade.t,
           timestamp: new Date(receivedTrade.T),
           volume: tradeVolume,
           totalVolume
       }
       sessions.forEach(session=>{
          session.emit("ticker", enrichedTrade);
       });
       console.log(enrichedTrade);
   });
});