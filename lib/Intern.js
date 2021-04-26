const Employee = require("./Employee");

class Intern extends Employee{// Uses Employee and gains new attr
    constructor(name, employeeId, email, school){
        super(name, employeeId, email);

        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Intern";
    }
}

module.exports = Intern;