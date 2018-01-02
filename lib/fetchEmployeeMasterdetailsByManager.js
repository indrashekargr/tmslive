'use strict';

//var mysql=require('./mysqlConnection');

//var atob = require('atob');
var mysql      = require('mysql');
var connection = mysql.createConnection({
       host: 'tmp4demo.mysql.database.azure.com',
    user: 'myadmin@tmp4demo',
   password: 'int123$%^',
    database: 'tms',
     port: 3306,     ssl: true
});

var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

module.exports = {
    fetchEmployeeMasterdetailsByManager: function(req,res){
       
        var managerEmpId = req.params.managerEmpId;
        
        try {
        
            //connection.connect();
            console.log("Connection established for resource user details for manager");

            connection.query('SELECT DISTINCT employeemaster.UserId AS UserId, employeemaster.EmployeeId AS EmployeeId, employeemaster.Username AS Username, employeemaster.Password AS Password, employeemaster.RoleId AS RoleId, employeemaster.ProfilePhoto AS ProfilePhoto,employeemaster.ReportingManager AS Reporting_Head ,(SELECT CONCAT(employeemaster.FirstName,employeemaster.LastName) FROM employeemaster WHERE employeemaster.EmployeeId = Reporting_Head) AS  reportingmanager,employeemaster.EmployeeId AS EmployeeId, employeemaster.FirstName AS FirstName,employeemaster.LastName AS LastName, designationmaster.DesignationName AS Designation,employeemaster.email AS Email, employeemaster.PriorExprience AS PriorExprience,employeemaster.integraExperience AS integraExperience, ROUND(employeemaster.PriorExprience + employeemaster.integraExperience,1) AS totalExperience, skillmaster.SkillName AS PrimarySkill,employeemaster.Availability AS Availability, employeemaster.DateOfLeaving AS DateOfLeaving FROM employeemaster JOIN skillmaster ON employeemaster.PrimarySkill = skillmaster.SkillId JOIN designationmaster ON designationmaster.Id = employeemaster.DesignationId where employeemaster.ReportingManager =' + connection.escape(managerEmpId), function(err, results) {
        
           if (err) throw err;
        
           if (results.length === 0) {
        
              res.send("Data not found for manager EmpId_ " +req.params.managerEmpId);
             // logger.info("success: false, message: 'Data not found for managerEmpId_" +req.params.managerEmpId);
              console.log("Data not found for managerEmpId_ "+req.params.managerEmpId)
        
            } else {
        
            console.log("resource user details for manager based on"  + req.params.managerEmpId);
            res.send(results);
            console.log(results);
        
            //logger.info("successfully fetched user deatils based on managerEmpId_" +req.params.managerEmpId);
        
         }
        
         });
         console.log("Connection closed.");
         //connection.end();
        } catch (err) {
        
          console.error(err);
        
        }

        }
           
    }

