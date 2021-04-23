const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name, employeeId, email, officeNum){
        super(name, employeeId, email);

        this.officeNum = officeNum;
    }

    getOfficeNum(){
        return this.officeNum;
    }

    getRole(){
        return "Manager";
    }
}

module.exports = Manager;