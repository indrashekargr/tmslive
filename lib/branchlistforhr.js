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
    branchlistforhr: function(req,res){
        try{
            //connection.connect();
            console.log("Connection established for branchlists");
            connection.query("SELECT BranchId, BranchName from branch WHERE IsDeleted='0' order by BranchId ASC", function(err, results) {
            if (err) throw err;
            if (results.length === 0) {
            // res.json({success: false, message: 'Data not found'});
            res.status(403).send({ success: false, message: 'Data not found '});
            //logger.info({ success: false, message: 'no data'});
            } else {
            console.log("managers");
            res.send(results);
           // logger.info({ success: true, message: 'Successfully fetched branch list'});
            console.log(results);
            //logger.info(results);
            }
            });
            console.log("Connection closed.");
            //connection.end();
            } catch (err) {
            console.error(err);
            
            };
        }
           
    }

