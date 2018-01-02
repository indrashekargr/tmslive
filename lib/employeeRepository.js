'use strict';

//var mysql=require('./mysqlConnection');

var mysql      = require('mysql');
var connection = mysql.createConnection({
       host: 'tmp4demo.mysql.database.azure.com',
    user: 'myadmin@tmp4demo',
   password: 'int123$%^',
    database: 'tms',
     port: 3306,     ssl: true
});

module.exports = {
    
    fetchAllEmployeeDataByHR: function(req,res){
      try{
        ////connection.connect();
        console.log("Connection established for All Employee Data details");
        connection.query("SELECT DISTINCT employeemaster.UserId AS UserId, employeemaster.EmployeeId AS EmployeeId, employeemaster.Username AS Username, employeemaster.Password AS Password, employeemaster.RoleId AS RoleId, employeemaster.ProfilePhoto AS ProfilePhoto, employeemaster.EmployeeId AS EmployeeId, employeemaster.FirstName AS FirstName,employeemaster.LastName AS LastName,employeemaster.ReportingManager AS Reporting_Head ,(SELECT IF(ISNULL(LastName), FirstName, CONCAT(FirstName, ' ', LastName)) FROM employeemaster WHERE employeemaster.EmployeeId = Reporting_Head) AS  reportingmanager, employeemaster.email AS Email, employeemaster.PriorExprience AS PriorExprience,employeemaster.integraExperience AS integraExperience, ROUND(employeemaster.PriorExprience + employeemaster.integraExperience,5) AS totalExperience, skillmaster.SkillName AS PrimarySkill,designationmaster.DesignationName AS Designation, employeemaster.DateOfLeaving AS DateOfLeaving FROM employeemaster JOIN skillmaster ON employeemaster.PrimarySkill = skillmaster.SkillId JOIN designationmaster ON employeemaster.DesignationId = designationmaster.Id  WHERE employeemaster.IsDeleted='0'", function(err, results) {
               if (err) {   
                throw err;
               }else{
                for(var i=0; i<results.length;i++){
                    var date;
                  date = new Date().toISOString().slice(0, 19).replace(/T.*/, ' ');
                  results[i].DateOfLeaving=date;
                  }
               
                return res.send(results);
               }
            });
            console.log("Connection closed.");
           // //connection.end();
        } catch (err) {
            console.error(err);
          } 
        }
           
    }

