const WebSocket = require('ws');
const webSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

const http = require("http");
const {Schema, connect, Types} = require("mongoose");
const mongoose = require("mongoose");
const server = http.createServer((req,res)=>{

});
const TradeSchema = new Schema({
   "_id": Schema.Types.ObjectId,
   "price": Number,
   "quantity": Number,
   "symbol": String,
   "tradeId": String,
   "sequence": Number,
   "timestamp": Date,
   "volume": Number,
   "totalVolume": Number
});
let Trade = mongoose.model("trades", TradeSchema);
connect("mongodb://localhost:27017/algodb", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
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
                process.nextTick(()=>{
                    enrichedTrade._id = new Types.ObjectId();
                    let tradeDocument = new Trade(enrichedTrade);
                    tradeDocument.save().then((result)=>{
                        console.log("Trade saved to database");
                    });
                });
                if (tradeVolume > 50_000){
                    sessions.forEach(session=>{
                        session.emit("high-volume-trades", JSON.stringify(enrichedTrade));
                    });
                }
                sessions.forEach(session=>{
                    session.emit("ticker", enrichedTrade);
                });
                console.log(enrichedTrade);
            });
        });
    });
