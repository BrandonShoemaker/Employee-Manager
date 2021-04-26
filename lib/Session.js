const inquirer = require('inquirer');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');
const Manager = require('./Manager.js');
const generateFile = require('../util/generateFile');
const htmlGenerator = require('../util/generateHTML');

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
            return inquirer
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

    getGithubs(){
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

    setManagers(name, employeeId, email){
        const validateNumbers = moreValidationChecks => ({
            validate: input => {
                if (input === '' ) 
                    return 'Please provide a valid number greater then 0 and be unique'
                
                if(this.getOfficeNums().indexOf(input) >= 0)
                    return 'Please enter a unique office number';
    
                return moreValidationChecks ? moreValidationChecks(input) : true;
            },
            filter: input => {
                let isntUnique = false;
                if(this.getOfficeNums().indexOf(input) >= 0)
                    isntUnique = true;
                // clear the invalid input
                return Number.isNaN(input) || Number(input) <= 0 || isntUnique ? '' : Number(input);
            }
        });

        return inquirer
        .prompt([{
            type: "number",
            name: "officeNum",
            message: "Enter this managers office number:  ",
            ...validateNumbers()
        }])
        .then(managerObj => {
            this.getManagers().push(new Manager(name, employeeId, email, managerObj.officeNum));
            this.getOfficeNums().push(managerObj.officeNum);
            this.setAnotherEmployee();
        })
        .catch(err => {
            console.log(err);
            return;
        })
    }

    setEngineers(name, employeeId, email){
        return inquirer
        .prompt({
            type: "input",
            name: "github",
            message: "Enter your github username:  ",
            validate: input => {
                if(this.notEmpty(input) && this.getGithubs().indexOf(input) >= 0)
                    return false;
                return true;
            }
        })
        .then(engineerObj => {
            this.getGithubs().push(engineerObj.github);
            this.getEngineers().push(new Engineer(name, employeeId, email, engineerObj.github));
            this.setAnotherEmployee();
            return;
        })
        .catch(err => {
            console.log(err);
        });

    }


    setInterns(name, employeeId, email){
        return inquirer
        .prompt({
            type: "input",
            name: "school",
            message: "Enter your college institute: ",
            validate: input => {
                return this.notEmpty(input);
            }
        })
        .then(internObj => {
            this.getInterns().push(new Intern(name, employeeId, email, internObj.school));
            this.setAnotherEmployee();
        })
        .catch(err => {
            console.log(err);
        })
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
            else{
                generateFile('index.html', htmlGenerator(this));
            }
        })
        .catch(err => {
            console.log(err);
            return;
        });
    }

    setEmployees(){
        const validateNumbers = moreValidationChecks => ({
            validate: input => {
                if (input === '' ) 
                    return 'Please provide a valid number greater then 0 and be unique'
                
                if(this.getOfficeNums().indexOf(input) >= 0)
                    return 'Please enter a unique emloyee ';
    
                return moreValidationChecks ? moreValidationChecks(input) : true;
            },
            filter: input => {
                let isntUnique = false;
                if(this.getOfficeNums().indexOf(input) >= 0)
                    isntUnique = true;
                // clear the invalid input
                return Number.isNaN(input) || Number(input) <= 0 || isntUnique ? '' : Number(input)
            }
        });


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
            type: "number",
            name: "employeeId",
            message: "Enter this employees ID: ",
            ...validateNumbers()
        },
        {
           type: "input",
           name: "email",
           message: "Enter this employees email address: ",
           validate: input => {
               if(this.notEmpty(input) && this.getEmails().indexOf(input) >= 0)
                    return "Please enter a unique email";
                return true;
           }
        },
        {
            type: "list",
            name: "employeeType",
            message: "Select the role of this employee: ",
            choices: ["Team Manager", "Engineer", "Intern"]
        }])
        .then(results => {
            this.getEmails().push(results.email);
            if(results.employeeType === "Team Manager")
                this.setManagers(results.name, results.employeeId, results.email);
            else if(results.employeeType === "Engineer")
                this.setEngineers(results.name, results.employeeId, results.email);
            else
                this.setInterns(results.name, results.employeeId, results.email);
        })
        .catch(err => {
            console.log(err);
        });
    }

    notEmpty(validateNotEmpty){
        if(validateNotEmpty) return true;
        return false;
    }
}

module.exports = Session;