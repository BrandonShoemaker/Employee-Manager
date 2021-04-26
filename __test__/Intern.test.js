const { test, expect } = require("@jest/globals");
const Intern = require("../lib/Intern.js");


let intern = new Intern('Dave', 1234, 'd@email.com', 'harvard');

test('Test encapsulation methods of Intern', () =>{
    expect(intern.name).toEqual('Dave');
    expect(intern.employeeId).toEqual(1234);
    expect(intern.email).toEqual('d@email.com');
    expect(intern.school).toEqual('harvard');    
});

test('Test encapsulation methods of Intern', () =>{
    expect(intern.getName()).toEqual('Dave');
    expect(intern.getId()).toEqual(1234);
    expect(intern.getEmail()).toEqual('d@email.com');
    expect(intern.getRole()).toEqual("Intern");
    expect(intern.getSchool()).toEqual("harvard");    
});