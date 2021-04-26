const { test, expect } = require("@jest/globals");
const Engineer = require('../lib/Engineer.js');

let engineer = new Engineer('Dave', 1234, 'd@email.com', 'github');

test('Test encapsulation methods of Engineer', () =>{
    expect(engineer.name).toEqual('Dave');
    expect(engineer.employeeId).toEqual(1234);
    expect(engineer.email).toEqual('d@email.com');
    expect(engineer.github).toEqual("github");    
});

test('Test encapsulation methods of Engineer', () =>{
    expect(engineer.getName()).toEqual('Dave');
    expect(engineer.getId()).toEqual(1234);
    expect(engineer.getEmail()).toEqual('d@email.com');
    expect(engineer.getRole()).toEqual("Engineer");
    expect(engineer.getGithub()).toEqual("github");    
});