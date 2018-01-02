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
    fetchcategorylist: function(req,res){
        try{
            //connection.connect();
            console.log("Connection established for category list for resource skills");
            connection.query("select DISTINCT CategoryId ,CategoryName , Description from categorymaster where IsDeleted = 0 order by CategoryName ASC", function(err, results) {
            
            if (err) throw err;
            if (results.length === 0) {
            res.status(403).send({success: false, message: 'Data not found'});
           // logger.info({ success: false, message: 'Data not found for categorymaster'});
            } else {
            console.log("category list for resource skills");
            res.send(results);
            console.log(results);
           // logger.info({ success: true, message: 'Successfully fetched category list for resource skills'});
            }
            });
            console.log("Connection closed.");
            //connection.end();
            } catch (err) {
            console.error(err);
            }
        }
           
    }

