const {connect_to_mongodb} = require("./mongo-repository-base");
const {createApi} = require("./hr-api");
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

// hook.enable();

const application = () => {
  console.log("Connected to mongodb!");
  createApi(()=>{
     console.log("Application is just started!");
  });
};

connect_to_mongodb().then(application);