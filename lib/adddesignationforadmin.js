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
    adddesignationforadmin: function(req,res){
     
        var DesignationName = req.body.DesignationName;
        //logger.info(req.body);
        if (!req.body.DesignationName){ 
        //logger.info({ success: false, message: 'StatusName must not empty'});
        console.log("DesignationName required");
        return res.status(401).send({success: false, message: 'DesignationName required'});
        
        }
        
        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        var adddesignationforadmin={
        
        DesignationName:req.body.DesignationName,
        IsDeleted : 0,
        CreatedDate: date,
        };
        //connection.connect();
        console.log("Connection established for add business unit");  
        connection.query('SELECT * FROM designationmaster WHERE DesignationName = ? ', [DesignationName]
        ,function(err,rows){
        if(err)
        console.log(err);
        
        if (!rows.length)
        {
        
        try{
        console.log("add designation");
        connection.query('INSERT INTO designationmaster SET ?', adddesignationforadmin,
        function(err, result) {
        if (err) throw err;
        if(result.length==0)
        {
        res.status(403).send({ success: false, message: 'data not inserted'});
        //logger.info({ success: false, message: 'failed to insert'});
        }
        else{
        
        
        res.send("Successfully added"+JSON.stringify(result));
        console.log(result);
        //logger.info({ success: true, message: 'Successfull added' });
        console.log("added");
        }
        });
        console.log("Connection closed.");
        //connection.end();
        }  catch (err) {
        console.error(err);
        }}
        else
        {
        console.log("already designation exist");
        res.send("already designation exist");
        
        //logger.info({ success: false, message: 'already status exist' + req.body.UserId});
        }
        });
    }   
}