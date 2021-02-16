USE employee_management_db;

INSERT INTO department (department_name) VALUES
    ('Operations'),
    ('Research and Development'),
    ('Human Resources'),
    ('Legal'),
    ('Sales'),
    ('Finance'),
    ('IT');


INSERT INTO employee_role (title, salary, department_id) VALUES
    ('Operations Analyst', 80000, 1),
    ('Operations Manager', 100000, 1),
    ('Research Analyst', 85000, 2),
    ('Research Manager', 100000, 2),
    ('HR Analyst', 80000, 3),
    ('HR Manager', 100000, 3),
    ('Contract Lawyer', 140000, 4),
    ('Compliance and Legal Manager', 180000, 4),
    ('Salesperson', 80000, 5),
    ('Sales Lead', 100000, 5),
    ('Senior Finance Advisor', 110000, 6),
    ('Director of Finance', 150000, 6),
    ('IT Technician', 98000, 7),
    ('System Admin', 135000, 7),
    

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Wiz', 'Khalifa', 1, NULL),
    ('Snoop', 'Dogg', 2, 1),
    ('Juicy', 'J', 3, NULL),
    ('Jay', 'Z', 4, 2),
    ('Kanye', 'West', 5, NULL),
    ('Kendrick', 'Lamar', 6, 3),
    ('50', 'Cent', 7, NULL),
    ('Tierra', 'Whack', 8, 4);
    ('Lauryn', 'Hill', 9, NULL),
    ('Young', 'Thug', 10, NULL),
    ('MF', 'Doom', 11, NULL),
    ('Joey', 'Bada$$', 12, NULL),
    ('Capital', 'Steez', 13, NULL),
    ('Lupe', 'Fiasco', 14, NULL),