const { test, expect } = require('@jest/globals');
const Employee = require('../lib/Employee.js');

let employee = new Employee('Dave', 1234, 'd@email.com');

test('Test to see if employee constructor works', () => {
    expect(employee.name).toEqual('Dave');
    expect(employee.employeeId).toEqual(1234);
    expect(employee.email).toEqual('d@email.com');    
});

test('Test if Employee encapsulation methods work', () => {
    expect(employee.getName()).toEqual('Dave');
    expect(employee.getId()).toEqual(1234);
    expect(employee.getEmail()).toEqual('d@email.com');
    expect(employee.getRole()).toEqual("Employee");
});