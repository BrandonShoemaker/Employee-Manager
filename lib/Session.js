const inquirer = require('inquirer');
const Manager = require('./Manager.js');

class Session{
    constructor(){
        this.managers = [];
        this.engineers = [];
        this.interns = [];
        this.emails = [];
        this.employeeIds = [];
        this.githubs = [];
        this.officeNums = [];
    }

    findEmployee(name, employeeArr){
        let foundEmployees = [];
        let employeeId = [];
        let choiceIndex;
        employeeArr.forEach(employee => {
            if(employee.getName() === name) {
                foundEmployees.push(employee);
                employeeId.push(employee.getId());
            }
        });

        if(foundEmployees > 1){
            inquirer
            .prompt({
                type: "list",
                name: "desiredEmployee",
                message: "There are multiple employees with the same name, please choose employee ID from the list: ",
                choices: employeeId
            })
            .then(employee => {
                choiceIndex = employeeId.indexOf(employee.desiredEmployee);
                return foundEmployees[choiceIndex];
            })
            .catch(err =>{
                console.log(err);
                return;
            });
        }

        return foundEmployees[0];
    }

    getEmployeeIds(){
        return this.employeeIds;
    }

    getEmails(){
        return this.emails;
    }

    getGitgubs(){
        return this.githubs;
    }

    getOfficeNums(){
        return this.officeNums;
    }

    getManagers(){
        return this.managers;
    }

    getEngineers(){
        return this.engineers;
    }

    getInterns(){
        return this.interns;
    }

    validateNumbers(moreValidationChecks){
        validate: input => {
            if (input === '' ) 
                return 'Please provide a valid number greater then 0'
            
            if(this.officeNums().indexOf(input) >= 0)
                return 'Please enter a unique office number';

            return moreValidationChecks ? moreValidationChecks(input) : true;
        },
        filter: input => {
            // clear the invalid input
            return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
        }
    }

    setManagers(name, employeeId, email){

        return inquirer
        .prompt([{
            type: "number",
            name: "officeNum",
            message: "Enter this managers office number:  ",
            ...validateNumbers()
        }])
        .then(managerObj => {
            this.getManagers().push(new Manager(name, employeeId, email, managerObj.office));
            this.getOfficeNums().push(managerObj.officeNums);
            
        })
        .catch(err => {
            console.log(err);
            return;
        })
    }

    setEngineers(){
        return inquirer
        .prompt({
            type: "input",
            name: "github",
            message: "Enter your github username:  "
        })
        .then()
    }

    setInterns(){

    }
    //  will lead to setEmployees to go through the process of adding another employee 
    setAnotherEmployee(){
        return inquirer
        .prompt({
            type: "confirm",
            name: "anotherEmployee",
            message: "Would you like to enter another epployee? ",
            default: false
        })
        .then(answer => {
            // move this to the setAnotherEmployee fn
        if(answer.anotherEmployee)
            this.setEmployees();
        return;
        })
        .catch(err => {
            console.log(err);
            return;
        });
    }

    setEmployees(){
        return inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "Enter this employees name: ",
            validate: validateNotEmpty => {
                return this.notEmpty(validateNotEmpty);
            }
        },
        {
            type: "input",
            name: "employeeId",
            message: "Enter this employees ID: ",
            validate: validateNotEmpty => {
                return this.notEmpty(validateNotEmpty);
            }
        },
        {
           type: "input",
           name: "email",
           message: "Enter this employees email address: ",
           validate: validateNotEmpty => {
               return this.notEmpty(validateNotEmpty);
           }
        },
        {
            type: "list",
            name: "employeeType",
            message: "Select the role of this employee: ",
            choices: ["Team Manager", "Engineer", "Intern"]
        }])
        .then(results => {
            if(results[4].employeeType === "Team Manager")
                this.setManagers();
            else if(results[4].employeeType === "Engineer")
                this.setEmployees();
            else
                this.setInterns();

        })
    }

    notEmpty(validateNotEmpty){
        if(validateNotEmpty) return true;
        return false;
    }
}

module.exports = Session;