
var express     = require('express'); //Untuk menjalankan fungsi expres
var path        = require('path'); //Mengambil Lokasi
var bodyParser  = require('body-parser'); //Midelware
var sessionfuu     = require('express-session');
var session;
var app = express(); // Instanisasi class express di OOP

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(sessionfuu({
        secret:'^%^&%^UHJ&TGYJGUJG*U',
        resave : false,
        saveUninitialized:true
        
    }));

    
   
    app.use('/cssFiles', express.static(__dirname +'/public/')); //Membuat path css dan memanggil server simple html

    app.get('/login', function(req, resp){  
        session = req.session;
        if(session.uniqueIdFuu){
            resp.sendFile('admin.html',{root: path.join(__dirname, './views')});
            }else{
              resp.sendFile('login.html',{root: path.join(__dirname, './views')});
            }

    });

    app.post('/login_cek', function(req, resp){
        // resp.end(JSON.stringify(req.body)); //Megambil data dari post
       session = req.session;
       if(session.uniqueIdFuu ){
        resp.redirect('/redirects');
        }
        if(req.body.username == 'admin@admin.com' && req.body.password =='12345678'){
            session.uniqueIdFuu = req.body.username;
        }
        resp.redirect('/redirects');
    });


    app.get('/redirects', function(req, resp){
        session = req.session; 
        if(session.uniqueIdFuu){
            console.log(session.uniqueIdFuu);
            resp.redirect('/admin');
        }else{
            resp.end('What do you mean? ');
        }
    });

    
    app.get('/logout', function(req, resp){
        req.session.destroy(function(error){
             console.log(error);
             resp.redirect('/login');

        })
    });

    app.get('/admin', function(req, resp){  
        session = req.session;
        if(session.uniqueIdFuu){
            resp.sendFile('admin.html',{root: path.join(__dirname, './views')});
            }else{
             resp.redirect('/login');  
            }

       
    });
   

   app.listen(9000,function() {
       console.log('List aplication running 9000')
   });  