const {connect_to_mongodb} = require("./mongo-repository-base");
const {getEmployeesByPage} = require("./mongo-repository");

const application = () => {
  console.log("Application started");
    getEmployeesByPage(0,10).then(console.log);
};

connect_to_mongodb().then(application);