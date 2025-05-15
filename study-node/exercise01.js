const {monitorEventLoopDelay} = require("perf_hooks");
const  h = monitorEventLoopDelay();
h.enable();
setTimeout(() => {
    h.disable();
    console.log(h);
},10_000);