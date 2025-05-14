const {connect_to_mongodb} = require("./mongo-repository-base");
const {getEmployeesByPage} = require("./mongo-repository");
const {createApi} = require("./hr-api");

const application = () => {
  console.log("Connected to mongodb!");
  createApi(()=>{
     console.log("Application is just started!");
  });
};

connect_to_mongodb().then(application);