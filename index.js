const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "your_database_name"
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