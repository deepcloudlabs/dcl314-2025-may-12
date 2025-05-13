const EventEmitter = require("events");
let emitter = new EventEmitter();

setInterval(() =>{
    emitter.emit("message", {timestamp: new Date(), value: "Hello Mars!"});
},3_000);

emitter.on("message", event_data => {
    console.log(event_data);
})
