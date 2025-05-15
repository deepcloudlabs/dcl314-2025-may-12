const WebSocket = require('ws');
const webSocket = new WebSocket(process.env.BINANCE_WS_URL);

const {Producer} = require("node-rdkafka");

const producer = new Producer({
    "bootstrap.servers": `${process.env.KAFKA_HOST}`
});

const createProducer = () => {
    return new Promise((resolve, reject) => {
        producer
            .on("ready", () => {
                resolve(producer);
            })
            .on("delivery-report", () => {

            })
            .on("event.error", (error) => {
                reject(error);
            });
        producer.connect();
    });
};

webSocket.on("open",async ()=>{
    console.log("Connected to binance ws server!");
    let totalVolume = 0;
    setInterval(()=>{
        totalVolume = 0;
    },60_000);
    const tradeProducer = await createProducer();
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
        tradeProducer.produce(`${process.env.KAFKA_TOPIC}`, null, Buffer.from(JSON.stringify(enrichedTrade)), enrichedTrade.symbol);

    });
});