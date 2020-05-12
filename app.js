const mysql = require("mysql");
const inquirer = require("inquirer");
// const addDepartment = require("./department");


const con = mysql.createConnection({
  host: "localhost", //Where my SQL is localhost = your machine
  user: "root", // your MySQL username
  password: "root", // your mysql password
  database: "employeesdb", // the data base you want to connect to
});

con.connect(function (err) {
  //Print out the error and exit id you encounter an error
  if (err) {
    console.err("Error not connected ");
    return;
  }
  //succcessful connection
  //you won
  console.log("Sucess!");
});

function start(con) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all employees by department",
          "View all roles",
          "Add Employee, role, department",
          "Update employee role",

          //"Update manager role"
        ],
      },
    ])
    .then(({ action }) => {
      console.log(action);
      if (action === "View all employees") {
        viewEmployees();
      } else if (action === "View all employees by department") {
        viewEmployeesDepartment();
      } else if (action === "View all roles") {
        viewRoles();
      } else if (action === "Add Employee, role, department") {
        add();
        return 
      } else {
        updateEmployeeRoles();
      }
      async.await()
      start(); 
    });
    
}

function add() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "question",
        message: "Would you like to add a department, role or employee ?",
        choices: ["department", "role", "employee"],
      },
    ])
    .then(({ question }) => {
      console.log(question);
      if (question === "department") {
        addDepartment(con);
      } else if (question === "role") {
        addRole();
      } else if (question === "employee") {
        addEmployee();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is the name of the department you want to add?  ",
      },
    ])
    .then(function (answer) {
      con.query(
        "INSERT INTO department SET ?",
 
        {
          title: answer.name
        },
        // connection.query("UPDATE posts SET title = :title", { title: "Hello MySQL" });
        function (err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
         start()
        }
      );
    });
 }

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "what is the title of the role?",
      },
      {
        name: "salary",
        message: "what is salary of the role",
      },

      {
        name: "department_id",
        message: "what is the department id ?",
      },
    ])
    .then(function (answer) {
      con.query(
        "INSERT INTO roles SET ?",

        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },

        function (err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "what is the first name of the employee",
      },
      {
        name: "last_name",
        message: "what is the last name of the employee",
      },

      {
        name: "role_id",
        message: "what is the role id?",
      },

      {
        name: "manager_id",
        message: "what is the manager id?",
      },
    ])
    .then(function (answer) {
      con.query(
        "INSERT INTO employee SET ?",

        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },

        function (err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function viewEmployees() {
  con.query(
    "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id);",
    function (err, results, fields) {
      console.table(results);
    }
  );
}

function viewEmployeesDepartment() {
  con.query(
    "SELECT  `first_name`, last_name,  as 'department' FROM employeesdb.department inner join employeesdb.employee on (employee.department = department);",
    function (err, results, fields) {
      console.table(results);
    }
  );
}

function viewRoles() {
  con.query(
    "SELECT `first_name`, `last_name`, `title` as 'role' FROM employeesdb.employee inner join employeesdb.roles on(employee.role_id = roles.id);",
    function (err, results, fields) {
      console.table(results);
    }
  );
}

function updateEmployeeRoles() {
  inquirer
    .prompt([
      {
        name: "id",
        message: "what is the employee id you would like to udate?",
      },
      {
        name: "title",
        message: "what is the new title ?",
      },
    ])

    .then(function (answer) {
      con.query(
        "UPDATE roles SET title = ? WHERE id = ?",

        // onnection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
        //   if (error) throw error;
        //   // ...
        // });
        [ answer.title, answer.id],

        function (err) {
          if (err) throw err;
          console.log("Your action was created successfully!");
          // re-prompt the user for if they want to bid or post
        }
      );
    });
}

start();
