class NewRole {
 title = ""; 
 salary = ""; 
 department_ID = "";

 constructor( title, salary){
  (this.title = title), (this.salary = salary); 

 }
 getTitle(){
  return this.title
 }
 getSalary(){
  return this.salary
 }

}inquirer.prompt([
 {
     type: "list",
     name: "action",
     message: "What would you like to do?",
     choices: [
         "View all employees",
         "View all employees by department",
         "View all employees by manager",
         "Add Employee",
         "Remove employee",
         "Update employee role",
         //"Update manager role"
     ]
 }
]).then(({ action }) => {
 console.log(action)
 if (answer === "View all employees") {
     viewEmployees()
 } else if (answer === "View all employees by department") {
     viewEmployeesDepartment()
 } else if (answer === "View all employees by manager") {
     viewMangers()
 } else if (answer === "Add Employee") {
     addEmployees()
 } else if (answer === "Remove employee") {
     removeEmployees()
 } else {
     UpdateEmployees()
 }
});