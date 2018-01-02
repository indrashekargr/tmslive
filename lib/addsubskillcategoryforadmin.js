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
    addsubskillcategoryforadmin: function(req,res){

        var date;
        date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        var SkillName = req.body.SkillName;
        var CategoryId=req.body.CategoryId;
        //logger.info(req.body);
        if (!req.body.CategoryId){ 
        //logger.info({ success: false, message: 'CategoryId must not empty'});
        console.log("CategoryId required");
        return res.status(401).send({success: false, message: 'CategoryId required'});
        
        }
        if (!req.body.SkillName){ 
        //logger.info({ success: false, message: 'SkillName must not empty'});
        console.log("SkillName required");
        return res.status(401).send({success: false, message: 'SkillName required'});
        
        }    
        if (!req.body.Description){ 
        //logger.info({ success: false, message: 'Description must not empty'});
        console.log("Description required");
        return res.status(401).send({success: false, message: 'Description required'});
        
        }  
        
        
        var addsubskillcategoryforadmin={
        CategoryId:req.body.CategoryId,
        SkillName:req.body.SkillName,
        Description : req.body.Description,
        IsDeleted : 0,
        CreatedDate: date,
        
        };

        //connection.connect();
        console.log("Connection established for add sub skill category master by admin");
        connection.query('SELECT * FROM skillmaster WHERE SkillName = ?  AND CategoryId=? ', [SkillName,CategoryId]
        ,function(err,rows){
        if(err)
        console.log(err);
        
        if (!rows.length)
        {
        
        console.log("add  subcategory");
        try{
            connection.query('INSERT INTO skillmaster SET ?', addsubskillcategoryforadmin,
        function(err, result) {
        if (err) throw err;
        
        res.send("Skill added successfully"+JSON.stringify(result));
        console.log(result);
        
        
        //logger.info({ success: true, message: 'Successfully subskill category' });
        console.log("added");
        });
        console.log("Connection closed.");
        //connection.end();
        }
        
        catch (err) {
        console.error(err);
        }
        }
        else
        {
        console.log("already subcategory exists");
        res.send("already subcategory exists");
        
        //logger.info({ success: false, message: 'already subcategory exists'+req.body.SkillName});
        }
        });
       
    }   
}