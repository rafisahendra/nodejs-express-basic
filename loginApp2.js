
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
        if(session.uniqueIdUname=='admin@admin.com'){
            resp.sendFile('admin.html',{root: path.join(__dirname, './views')});
            }else{
              resp.sendFile('login.html',{root: path.join(__dirname, './views')});
            }

    });

    app.post('/login_cek', function(req, resp){
        session = req.session;
        if(req.body.username == 'admin@admin.com' && req.body.password =='12345678'){
            session.uniqueIdUname = req.body.username;
            resp.redirect('/redirects');
        }else{
            resp.redirect('/redirects'); 
        }
          
    });


    app.get('/redirects', function(req, resp){
        session = req.session; 
        if(session.uniqueIdUname == 'admin@admin.com'){
            console.log(session.uniqueIdUname);
            resp.redirect('/admin');
        }else{
            console.log(session.uniqueIdUname);
            // resp.end(req.session.uniqueIdUname +'Error Not Found? ');
            resp.redirect('/login');
           
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
        if(session.uniqueIdUname != 'admin@admin.com'){
            resp.redirect('/login');  
            }else{
             resp.sendFile('admin.html',{root: path.join(__dirname, './views')});
            }

       
    });
   

   app.listen(9000,function() {
       console.log('List aplication running 9000')
   });  