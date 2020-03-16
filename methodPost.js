
var express     = require('express'); //Untuk menjalankan fungsi expres
var path        = require('path'); //Mengambil Lokasi
var fs          = require('fs'); // File sistem mebaca sitem, hapus dll
var bodyParser  = require('body-parser'); //Midelware
var app = express(); // Instanosasi class express di OOP

    app.use(bodyParser()); 
    app.use('/cssFiles', express.static(__dirname +'/public/')); //Membuat path css dan memanggil server simple html

    app.get('/', function(req, resp){

        resp.sendFile('home.html',{root: path.join(__dirname, './view')});
    });

    app.post('/', function(req, resp){
        // resp.sendFile('home.html',{root: path.join(__dirname, './view')});
        // if(req.body.username == 'admin@admin.com' && req.body.username == '12345678'){} ///basic dari express bodyParser

        // resp.end(JSON.stringify(req.body)); // Jika mengambil data json
     
        resp.end('Nama Saya :'+ req.body.firstName); //Jika menampilkan hasil ke Web

    });

// ExpressJS Tutorial 19: POST Method (body-parser) // req.query untuk GET dan req.body untuk POST

   app.listen(9000,function() {
       console.log('List aplication running 9000')
   });  