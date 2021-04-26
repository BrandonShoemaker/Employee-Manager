class Employee{ // base class for all employees to use
    constructor(name, employeeId, email){
        this.name = name;
        this.employeeId = employeeId;
        this.email = email;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.employeeId;
    }
    
    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee";
    }
}

module.exports = Employee;