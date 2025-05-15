const express = require('express');
const {
    getEmployeeByIdentity,
    getEmployeesByPage,
    createEmployee,
    updateEmployee,
    removeEmployee
} = require("./mongo-repository");
const bodyParser = require("body-parser");
const logger = require("morgan")
const swaggerUi = require("swagger-ui-express");
const contract = require("./swagger-hr-api.json");

const api = express();

function createApi(callback) {
    //region initialize API
    api.use(bodyParser.json({limit: '5mb'}));
    api.use(logger(process.env.PROFILE));
    //endregion

    //region CORS FILTER
    api.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "HEAD,OPTIONS,POST,PUT,PATCH,DELETE,GET");
        res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
        next();
    });
    //endregion

    //region Swagger Documentation
    const contract = require("./swagger-hr-api.json");
    // http://localhost:9100/api-docs
    api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(contract));
    let port = process.env.SERVER_PORT || 9100;
    //endregion

    // REST API = Command Query Segregation
// Command = Create, Update, Delete
// Query = Get, List

//region Query

// GET http://localhost:9100/hr/api/v1/employees/11111111110
    api.get('/hr/api/v1/employees/:identity', (req, res) => {
        const identity = req.params.identity;
        getEmployeeByIdentity(identity).then(employee => {
            res.set("Content-Type", "application/json");
            res.status(200).send(employee);
        }).catch(err => {
            res.status(404).send(err);
        });
    });
// GET http://localhost:9100/hr/api/v1/employees?page=10&size=25

    api.get('/hr/api/v1/employees', (req, res) => {
        const pageNo = Number(req.query.page || 0);
        const pageSize = Number(req.query.size || 25);
        getEmployeesByPage(pageNo, pageSize).then(employees => {
            res.set("Content-Type", "application/json");
            res.status(200).send(employees);
        }).catch(err => {
            res.status(404).send(err);
        });
    });
//endregion

//region Command

// POST http://localhost:9100/hr/api/v1/employees

    api.post('/hr/api/v1/employees', (req, res) => {
        const employee = req.body;

        createEmployee(employee).then(insertedEmployee => {
            const event = {
                eventType: "EMPLOYEE_HIRED_EVENT",
                timestamp: new Date(),
                employeeId: employee.identity,
                employeeEmail: employee.email
            };
            sessions.forEach(session => {
               io.emit('hr-events', event);
            });
            res.set("Content-Type", "application/json");
            res.status(200).send(insertedEmployee);
        }).catch(err => {
                res.status(400).send(err);
            }
        )
    })
// PUT http://localhost:9100/hr/api/v1/employees

    api.put('/hr/api/v1/employees/:identity', (req, res) => {
        const employee = req.body;
        updateEmployee(employee).then(updatedEmployee => {
            res.set("Content-Type", "application/json");
            res.status(200).send(updatedEmployee);
        }).catch(err => {
                res.status(400).send(err);
            }
        )
    })
// PATCH http://localhost:9100/hr/api/v1/employees

    api.patch('/hr/api/v1/employees/:identity', (req, res) => {
        const employee = req.body;
        updateEmployee(employee).then(updatedEmployee => {
            res.set("Content-Type", "application/json");
            res.status(200).send(updatedEmployee);
        }).catch(err => {
                res.status(400).send(err);
            }
        )
    })
// DELETE http://localhost:9100/hr/api/v1/employees/11111111110
    api.delete('/hr/api/v1/employees/:identity', (req, res) => {
        const identity = req.params.identity;
        removeEmployee(identity).then(removedEmployee => {
            res.set("Content-Type", "application/json");
            res.status(200).send(removedEmployee);
        }).catch(err => {
                res.status(400).send(err);
            }
        )
    });
//endregion
    let sessions = [];
    const server = api.listen(port, callback);
    const io = require('socket.io')(server,{
        "cors": "*",
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]
    });
    io.on('connection', (session) => {
        console.log(`New session is created: ${session.id}.`);
        sessions.push(session);
        session.on('disconnect', () => {
            sessions = sessions.filter(s => s.id !== session.id);
            console.log(`A session is closed: ${session.id}.`);
        });
    });
}

function getApi() {
    return api;
}

exports.createApi = createApi;
exports.getApi = getApi;