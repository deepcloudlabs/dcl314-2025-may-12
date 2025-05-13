const WebSocket = require("ws");
const EventEmitter = require("events");
let emitter = new EventEmitter();

const ws_client = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

ws_client.on("open", ()=>{
   console.log("Connected to the binance ws server.");
});

ws_client.on("message", (market_data)=>{
    let trade = JSON.parse(new String(market_data));
    emitter.emit("trade", trade);
});

emitter.on("trade", data => {
    console.log(JSON.stringify(data));
})

let volume = 0;
emitter.on("trade", data => {
    volume += Number(data.p) * Number(data.q)
    console.log(`volume: ${volume}`);
})

let indicator1 = 0;
emitter.on("trade", data => {
    indicator1 += Number(data.q)
    console.log(`indicator1: ${indicator1}`);
})

setInterval(() =>{
    volume = 0;
    indicator1 = 0;
}, 300_000)
