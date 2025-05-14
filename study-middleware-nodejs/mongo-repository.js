const {getEmployeeModel, isUpdateableField} = require('./domain');

const EmployeeModel = getEmployeeModel();

function getEmployeeByIdentity(identity) {
    return EmployeeModel.findOne({"_id": identity});
}

function getEmployeesByPage(pageNo = 0, pageSize = 10, projection = {}) {
    const skip = pageNo * pageSize;
    const limit = pageSize;
    return EmployeeModel.find({}, projection, {skip, limit});
}

function createEmployee(employee) {
    const employeeDocument = new EmployeeModel(employee);
    return employeeDocument.save();
}

function updateEmployee(employee) {
    let updateableEmployee= {};
    for (const [field, value] of Object.entries(employee)) {
        if (isUpdateableField(field)){
            updateableEmployee[field] = value;
        }
    }
    return EmployeeModel.updateOne(
        {"_id": employee._id},
        {$set : updateableEmployee},
        {upsert: false}
    );
}

function removeEmployee(identity) {
    return EmployeeModel.findOneAndDelete({"_id": identity});
}

function groupEmployeesByDepartment() {
    return EmployeeModel.aggregate([
        {
            $group: {
                _id: "$department",
                employees: {$push: "$_id"},
                "size": {$sum: 1},
                "salary": {"$sum": "$salary"}
            }
        },
        {
            $sort: {
                "salary": -1
            }
        }
    ])
}

module.exports = {
    getEmployeeByIdentity,
    getEmployeesByPage,
    createEmployee,
    updateEmployee,
    removeEmployee,
    groupEmployeesByDepartment
}