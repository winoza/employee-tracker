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
                "Add department, employee, or role",
                "View departments, employees, or roles",
                "Delete departments, employees, or roles",
                "Update roles",
                "Exit"
            ]
        }]).then(selection => {
        if (selection.chooseAction === "Add department, employee, or role") {
            add();
        } else if (selection.chooseAction === "View departments, employees, or roles") {
            view();
        } else if (selection.chooseAction === "Delete departments, employees, or roles") {
            deletes();
        } else if (selection.chooseAction === "Update roles") {
            updateRole();
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
                "Add employee",
                "Add role",
                "Main Menu"
            ]
        }]).then(selection => {
            if (selection.chooseAdd === "Add department") {
                addDept();
            } else if (selection.chooseAdd === "Add employee") {
                addEmployee();
            } else if (selection.chooseAdd === "Add role") {
                addRole();
            } else {
                manageCompany();
        }
    });
}

addDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addDept",
            message: "Please enter the name of your department."
        },
        ]).then(answers => {
            connection.query(
                "INSERT INTO department SET ?",
                { 
                    department_name: answers.addDept
                }, 
            (err) => {
                if (err) throw err
                console.log("-----Department added successfully!-----");
                manageCompany();
        })
    });
}

addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Please enter employee's id."
        },
        {
            type: "input",
            name: "firstName",
            message: "Please enter employee's first name."
        },
        {
            type: "input",
            name: "lastName",
            message: "Please enter employee's last name."
        },
        {
            type: "input",
            name: "addEmployeeRole",
            message: "Please enter employee's role id."
        },
        {
            type: "input",
            name: "addEmployeeManager",
            message: "Please enter employee's manager id. (If no manager, click 'Enter')"
        },
        ]).then(answers => {
            connection.query(
                "INSERT INTO employee SET ?",
                { 
                    id: answers.employeeId,
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.addEmployeeRole,
                    manager_id: answers.addEmployeeManager 
                }, 
            (err) => {
                if (err) throw err
                console.log("-----Employee added successfully!-----");
                manageCompany();
        })
    });
}

addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "addingRole",
            message: "What role would you like to add?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Please enter role's salary."
        },
        {
            type: "input",
            name: "addDeptId",
            message: "Please enter department id no."
        },
        ]).then(answers => {
            connection.query(
                "INSERT INTO employee_role SET ?",
                { 
                    title: answers.addingRole,
                    salary: answers.roleSalary,
                    department_id: answers.addDeptId, 
                }, 
            (err) => {
                if (err) throw err
                console.log("-----Role added successfully!-----");
                manageCompany();
        })
    });
}

view = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseView",
            message: "What would you like to view?",
            choices: [
                "View departments",
                "View employees",
                "View roles",
                "Main Menu"
            ]
        }]).then(selection => {
            if (selection.chooseView === "View departments") {
                viewDept();
            } else if (selection.chooseView === "View employees") {
                viewEmployee();
            } else if (selection.chooseView === "View roles") {
                viewRole();
            } else {
                manageCompany();
            }
    });
}

viewDept = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err
        console.table(res);
        manageCompany();
    })
}

viewEmployee = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err
        console.table(res);
        manageCompany();
    })
}

viewRole = () => {
    connection.query("SELECT * FROM employee_role", (err, res) => {
        if (err) throw err
        console.table(res);
        manageCompany();
    })
}


updateRole = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "chooseEmployeeUpdate",
                type: "list",
                choices: function() {
                    var employees = [];
                    for (var i = 0; i < res.length; i++) {
                        employees.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`)
                    };
                    return employees;
                },
                message: "Please select the employee you would like update.",
            },
            {
                name: "updateRoleId",
                type: "input",
                message: "Please select employee's new role (id).",
            },
            ]).then(answers => {
                var chosenEmployee;
                for (var i = 0; i < res.length; i++) {
                if (`${res[i].id} ${res[i].first_name} ${res[i].last_name}` === answers.chooseEmployeeUpdate) {
                    chosenEmployee = res[i];
                    }
                }
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                        {
                            role_id: answers.updateRoleId
                        },
                        {
                            id: chosenEmployee.id
                        }
                    ],
                (err) => {
                    if (err) throw err
                    console.log("-----Employee role updated successfully!-----");
                    manageCompany();
            })
        });
    })
}

deletes = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "chooseAdd",
            message: "What would you like to add?",
            choices: [
                "Delete department",
                "Delete employee",
                "Delete role",
                "Main Menu"
            ]
        }]).then(selection => {
            if (selection.chooseAdd === "Delete department") {
                deleteDept();
            } else if (selection.chooseAdd === "Delete employee") {
                deleteEmployee();
            } else if (selection.chooseAdd === "Delete role") {
                deleteRole();
            } else {
                manageCompany();
        }
    });
}

deleteDept = () => {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "deletingDept",
                type: "list",
                choices: function() {
                    var departments = [];
                    for (var i = 0; i < res.length; i++) {
                        departments.push(`${res[i].id} ${res[i].department_name}`)
                    };
                    return departments;
                },
                message: "Please select the department you would like to delete.",
            },
            ]).then(answers => {
                var chosenDept;
                for (var i = 0; i < res.length; i++) {
                if (`${res[i].id} ${res[i].department_name}` === answers.deletingDept) {
                    chosenDept = res[i];
                    }
                }
                connection.query(
                    "DELETE FROM department WHERE ?",
                    [
                        {
                            id: chosenDept.id
                        },
                    ],
                (err) => {
                    if (err) throw err
                    console.log("-----Department deleted successfully!-----");
                    manageCompany();
            })
        });
    })
}

deleteEmployee = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "deletingEmp",
                type: "list",
                choices: function() {
                    var employees = [];
                    for (var i = 0; i < res.length; i++) {
                        employees.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`)
                    };
                    return employees;
                },
                message: "Please select the department you would like to delete.",
            },
            ]).then(answers => {
                var chosenEmp;
                for (var i = 0; i < res.length; i++) {
                if (`${res[i].id} ${res[i].first_name} ${res[i].last_name}` === answers.deletingEmp) {
                    chosenEmp = res[i];
                    }
                }
                connection.query(
                    "DELETE FROM employee WHERE ?",
                    [
                        {
                            id: chosenEmp.id
                        },
                    ],
                (err) => {
                    if (err) throw err
                    console.log("-----Department deleted successfully!-----");
                    manageCompany();
            })
        });
    })
}

/*deleteRole = () => {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "deletingDept",
                type: "list",
                choices: function() {
                    var departments = [];
                    for (var i = 0; i < res.length; i++) {
                        departments.push(`${res[i].name}`)
                    };
                    return departments;
                },
                message: "Please select the department you would like to delete.",
            },
            ]).then(answers => {
                var chosenDept;
                for (var i = 0; i < res.length; i++) {
                if (`${res[i].id} ${res[i].first_name} ${res[i].last_name}` === answers.chooseEmployeeUpdate) {
                    chosenDept = res[i];
                    }
                }
                connection.query(
                    "DELETE FROM department WHERE ?",
                    [
                        {
                            id: chosenDept.id
                        },
                    ],
                (err) => {
                    if (err) throw err
                    console.log("-----Department deleted successfully!-----");
                    //manageCompany();
            })
        });
    })
}
*/