//  var express = require('express');
//  var app = express();
    
        // console.log(__dirname);

//     app.use('/cssFiles', express.static(__dirname +'/public/css/')); //Memanggil File Css disimpan ke variabel 
//     // http://localhost:port/cssFiles/  
//     app.get('/halaman', function(request, response){
//     response.send('Hello There From express')
//         });
//  ExpressJS Tutorial 15: Serving Static Files

var express = require('express');
var path =require('path');
var fs   = require('fs');
var app = express();

    app.use('/cssFiles', express.static(__dirname +'/public/')); //Membuat path css dan memanggil server simple html

    app.get('/', function(req, resp){
        resp.sendFile('home.html',{root: path.join(__dirname, './views')});
    });

    app.get(/^(.+)$/, function(req , resp){
        // console.log(req.params);
        // console.log(path.join(__dirname, './views',req.params[0]+'.html'));
        try{

            if(fs.statSync(path.join(__dirname, './views',req.params[0]+'.html')).isFile()){
                resp.sendFile(req.params[0]+'.html',{root: path.join(__dirname, './views')});
            }

        }catch(err){
            console.log(err);
            resp.sendFile('404.html',{root: path.join(__dirname, './views')});
         }       
      
    });
// ExpressJS Tutorial 16: Simple HTML Server - Part 1 - 2

   app.listen(9000,function() {
       console.log('List aplication running 9000')
   });  