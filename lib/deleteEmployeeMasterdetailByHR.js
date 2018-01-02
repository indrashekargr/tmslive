'use strict';

//var mysql=require('./mysqlConnection');

//var fetchAllReportingHeads = require('./fetchAllReportingHeads'); 
var mysql      = require('mysql');
var connection = mysql.createConnection({
       host: 'tmp4demo.mysql.database.azure.com',
    user: 'myadmin@tmp4demo',
   password: 'int123$%^',
    database: 'tms',
     port: 3306,     ssl: true
});
module.exports = {
    deleteEmployeeMasterdetailByHR: function(req,res){

        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try{
            //connection.connect();
            console.log("Connection established for delete Employee master detail for HR");
            connection.query("UPDATE `employeemaster` SET `IsDeleted`=1,`ModifiedDate`=? where `EmployeeId`=?", [date,req.body.EmployeeId] , function(err,result) {
            
            if (err) throw err;
            console.log("Deleted Employee Master Detail for EmployeeId_" +req.body.EmployeeId);
            res.send("Deleted Employee Master Detail "+JSON.stringify(result));
            console.log(result);
           // logger.info({ success: true, message: 'Successfully Deleted Employee Master Detail for EmployeeId_' +req.body.EmployeeId});
            
            });
            console.log("Connection closed.");
            //connection.end();
            }catch (err) { 
            console.error(err);
            }

        }
           
    }

