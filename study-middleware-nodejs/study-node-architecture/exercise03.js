const async_hooks = require('async_hooks');
const fs = require('fs');

const hook = async_hooks.createHook({
    init: (asyncId, type, triggerAsyncId) => {
        fs.writeSync(2,`init: ${type} ${asyncId} ${triggerAsyncId}\n`);
    },
    before: (asyncId) => {
        fs.writeSync(2,`before: ${asyncId}\n`);
    },
    after: (asyncId) => {
        fs.writeSync(2,`after: ${asyncId}\n`);
    },
    destroy: (asyncId) => {
        fs.writeSync(2,`destroy: ${asyncId}\n`);
    },
    promiseResolve: (asyncId) => {
        fs.writeSync(2,`promiseResolve: ${asyncId}\n`);
    }
})

function fun(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(42);
        });
    })
}

hook.enable();

fs.writeSync(2,"Application started\n"); // call stack
setTimeout(() => {
    fs.writeSync(2,"setTimeout 1\n");
    /*setTimeout(() => {
        fs.writeSync(2,"setTimeout 2\n");
    })*/
}, 0);
setImmediate(() => {
    fs.writeSync(2,"setImmediate\n");
})
process.nextTick(() => {
    fs.writeSync(2,"nextTick\n");
})
queueMicrotask(() => {
    fs.writeSync(2,"queueMicrotask\n");
})

fun().then(result => {
    fs.writeSync(2,`Promise: ${result}\n`);
})

fs.writeSync(2,"Application stoped\n"); // call stack
