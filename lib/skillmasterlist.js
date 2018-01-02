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
    skillmasterlist: function(req,res){
        try{
            //connection.connect();
            console.log("Connection established for search all employee resource skills for Manager");
            connection.query("SELECT SkillId, SkillName from skillmaster order by SkillName ASC", function(err, results) {
            
            if (err) throw err;
            if (results.length === 0) {
            // res.json({success: false, message: 'Data not found'});
            res.status(403).send({ success: false, message: 'Data not found '});
            //logger.info({ success: false, message: 'no data'});
            } else {
            console.log("role list");
            res.send(results);
            //logger.info({ success: true, message: 'Successfully fetched skills'});
            console.log(results);
           // logger.info("all skills");
            }
            });
            console.log("Connection closed.");
            //connection.end();
            } catch (err) {
            console.error(err);
            }
        }
           
    }

