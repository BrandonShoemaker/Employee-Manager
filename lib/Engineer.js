const Employee = require("./Employee");

class Engineer extends Employee{ // Uses Employee and gains new attr
    constructor(name, employeeId, email, github){
        super(name, employeeId, email);

        this.github = github;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;