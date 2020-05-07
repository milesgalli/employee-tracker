const mysql = require('mysql'); 
const inquirer = require('inquirer')

const con = mysql.createConnection({

 host: "localhost", //Where my SQL is localhost = your machine
 user: "root", // your MySQL username
 password: "root", // your mysql password 
 database: 'employeeDB'// the data base you want to connect to 

})


con.connect(function(err){
 //Print out the error and exit id you encounter an error 
 if(err){
  console.err('coooked it')
  return; 
 }
 //succcessful connection 
 //you won
console.log("Sucess!");
})
