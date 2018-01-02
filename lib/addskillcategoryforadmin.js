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
    addskillcategoryforadmin: function(req,res){
        try{

            var CategoryName = req.body.CategoryName;
            
                if (!req.body.CategoryName){ 
                //logger.info({ success: false, message: 'CategoryName must not empty'});
                console.log("CategoryName required");
                return res.status(401).send({success: false, message: 'CategoryName required'});
                
                }  
                if (!req.body.Description){ 
               // logger.info({ success: false, message: 'Description must not empty'});
                console.log("Description required");
                return res.status(401).send({success: false, message: 'Description required'});
                
                }
                
                var date;
                date = new Date().toISOString().slice(0, 19).replace('T', ' ');

                var addskillcategoryforadmin={
                    
                CategoryName:req.body.CategoryName,
                Description : req.body.Description,
                IsDeleted : 0,
                CreatedDate: date,
                };
                //connection.connect();
                console.log("Connection established for add skill category by admin");
                connection.query('SELECT * FROM categorymaster WHERE CategoryName = ? ', [CategoryName]
                ,function(err,rows){
                if(err)
                console.log(err);
                
                if (!rows.length)
                {
                
                console.log("add category");
                connection.query('INSERT INTO categorymaster SET ?', addskillcategoryforadmin,
                function(err, result) {
                if (err) throw err;
                
                res.send("Successfully added "+JSON.stringify(result));
                console.log("Successfully added :- " + result.insertId);
                
                //logger.info({ success: true, message: 'Successfully added category ' });
                console.log("added");
                });
                
               
                }   
                else
                {
                console.log("already category exist");
                res.send("already category exist");
                
                //logger.info({ success: false, message: 'already category exist' + req.body.UserId});
                }
                });
                console.log("Connection closed.");
                //connection.end();
        }catch (err) {
            console.error(err);
            }
        }
    }   