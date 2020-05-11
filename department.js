
const inquirer = require('inquirer');


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
         start();
       }
     );
   });
}



module.exports = addDepartment