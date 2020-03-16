 var express       = require('express');
 var cookieParser  = require('cookie-parser');

 var app = express();
 app.use(cookieParser());

    app.get('/', function (req, resp){
    resp.cookie('myFirstCookie','Loks Good');  
    resp.end('Add Cookie');
    });

    app.get('/removeCookie', function (req, resp){
        resp.clearCookie('myFirstCookie','Loks Good');  
        resp.end('Remove Cookie');
        });

        app.listen(9000, function(){
            console.log('Server runing port 9000');
        });