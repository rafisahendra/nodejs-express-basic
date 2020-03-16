//GET and POST
// http://exploitid.com/?myFile=about.zip&version=1.0

var express = require('express');
var path =require('path');
var fs   = require('fs');
var app = express();

    app.use('/cssFiles', express.static(__dirname +'/public/')); //

    app.get('/', function(req, resp){
        
        // resp.end(JSON.stringify(req.query)); 
        var response ="Hello! " + req.query.firstName;
        resp.end(response);
    });


// ExpressJS Tutorial 18: GET Method

   app.listen(9000,function() {
       console.log('List aplication running 9000')
   });  

   // http://exploitid.com > nodeJs +Express