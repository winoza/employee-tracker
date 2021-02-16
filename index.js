const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "chicken20",
  database: "employee_management_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  manageCompany();
});

manageCompany = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseAction",
            message: "What would you like to do?",
            choices: [
                "Add department, role, or employee",
                "View departments, roles, or employees",
                "Update departments, roles, or employees",
                "Exit"
            ]
        }]).then(selection => {
        if (selection.chooseAction === "Add department, role, or employee") {
            add();
        } else if (selection.chooseAction === "View departments, roles, or employees") {
            view();
        } else if (selection.chooseAction === "Update departments, roles, or employees") {
            update();
        } else {
            quit();
        }
    });
}

add = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseAdd",
            message: "What would you like to add?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "Main Menu"
            ]
        }]).then(selection => {
            if (selection.chooseAction === "Add department") {
                addDept();
            } else if (selection.chooseAction === "Add role") {
                addRole();
            } else if (selection.chooseAction === "Add employee") {
                addEmployee();
            } else {
                manageCompany();
            }
    });
}

addDept = () => {

}

addRole = () => {

}

addEmployee = () => {

}

view = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseView",
            message: "What would you like to view?",
            choices: [
                "View department",
                "View role",
                "View employee",
                "Main Menu"
            ]
        }]).then(selection => {
            if (selection.chooseAction === "View department") {
                viewDept();
            } else if (selection.chooseAction === "View role") {
                viewRole();
            } else if (selection.chooseAction === "View employee") {
                viewEmployee();
            } else {
                manageCompany();
            }
    });
}

viewDept = () => {

}

viewRole = () => {

}

viewEmployee = () => {

}

update = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseUpdate",
            message: "What would you like to update?",
            choices: [
                "Update department",
                "Update role",
                "Update employee",
                "Main Menu"
            ]
        }]).then(selection => {
            if (selection.chooseAction === "Update department") {
                updateDept();
            } else if (selection.chooseAction === "Update role") {
                updateRole();
            } else if (selection.chooseAction === "Update employee") {
                updateEmployee();
            } else {
                manageCompany();
            }
    });
}

updateDept = () => {

}

updateRole = () => {

}

updateEmployee = () => {

}