const { test, expect } = require("@jest/globals");
const Manager = require("../lib/Manager.js");


let manager = new Manager('Dave', 1234, 'd@email.com', 1234);

test('Test encapsulation methods of Manager', () =>{
    expect(manager.name).toEqual('Dave');
    expect(manager.employeeId).toEqual(1234);
    expect(manager.email).toEqual('d@email.com');
    expect(manager.officeNum).toEqual(1234);    
});

test('Test encapsulation methods of Manager', () =>{
    expect(manager.getName()).toEqual('Dave');
    expect(manager.getId()).toEqual(1234);
    expect(manager.getEmail()).toEqual('d@email.com');
    expect(manager.getRole()).toEqual("Manager");
    expect(manager.getOfficeNum()).toEqual(1234);    
});