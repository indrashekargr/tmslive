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
    addbumasterbyadmin: function(req,res){
      
        var buName = req.body.buName;
        //logger.info(req.body);
        if (!req.body.buName){ 
        //logger.info({ success: false, message: 'StatusName must not empty'});
        console.log("buName required");
        return res.status(401).send({success: false, message: 'buName required'});
        
        }
        if (!req.body.Description){ 
        //logger.info({ success: false, message: 'Description must not empty'});
        console.log("Description required");
        return res.status(401).send({success: false, message: 'Description required'});
        
        }  
        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        var addbumasterbyadmin={
        
        buName:req.body.buName,
        Description : req.body.Description,
        IsDeleted : 0,
        CreatedDate: date,
        CreatedBy:req.body.CreatedBy
        };
        //connection.connect();
        console.log("Connection established for add business unit");  
        connection.query('SELECT * FROM businessunitmaster WHERE buName = ? ', [buName]
        ,function(err,rows){
        if(err)
        console.log(err);
        
        if (!rows.length)
        {
        
        try{
        console.log("add business unit");
        connection.query('INSERT INTO businessunitmaster SET ?', addbumasterbyadmin,
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
        console.log("already unitName exist");
        res.send("already unitName exist");
        
        //logger.info({ success: false, message: 'already status exist' + req.body.UserId});
        }
        });
    }   
}