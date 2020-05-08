const mysql = require("mysql");
const inquirer = require("inquirer");

const con = mysql.createConnection({
  host: "localhost", //Where my SQL is localhost = your machine
  user: "root", // your MySQL username
  password: "root", // your mysql password
  database: "employeeDB", // the data base you want to connect to
});

con.connect(function (err) {
  //Print out the error and exit id you encounter an error
  if (err) {
    console.err("coooked it");
    return;
  }
  //succcessful connection
  //you won
  console.log("Sucess!");
});

// PSEUDO CODE

// enquirer for add, view and update delete.

// create a function so if you select one of the chocies it pops up for the selected chocie.

// in the promsie use the the resposne tp
function start (){

  let questions = "";
  inquirer
    .prompt([
      {
        type: "list",
        name: "question",
        message: "Would you like to add a department, role or employee ?",
        choices: [" department ", " role", " employee"],
      },
    ])
    .then(({ question }) => {
       console.log(question);
      if (question === "department") {
        addDepartment();

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
     
        name: "name",
        id: "",
        message: "what is the name of the department you want to add?  ",

      },
    ])
    .then(function (answer) {
 
      con.query(
        "INSERT INTO department SET? ",

        {
          name: answer.name,
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


function addRole() {
 inquirer
   .prompt([
     {
    
       name: "title",
       message: "what is the title of the role?  ",

     },
     {
    
      name: "salary",
      message: "what is salary of the role ",

    },

    {
    
     name: "department id",
     message: "what is salary of the role ",

   },
   ])
   .then(function (answer) {

     con.query(
       "INSERT INTO role SET? ",

       {
         name: answer.name,
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


addDepartment(); 

start(); 