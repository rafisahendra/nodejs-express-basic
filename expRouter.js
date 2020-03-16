// http://localhost/howControlThis/This/asd/sd
var express = require('express');
var app     = express();
var router  = express.Router();

app.use('/MyFirstRouter', router); //router disini intanisasi untuk reouter.get()

router.get('/heyIniRouterPertama', function(req, resp){
    resp.end('whats it going On (Pertama 001 Success)');
});

router.get('/heyIniRouterKedua', function(req, resp){
    resp.end('whats it going On  (Kedua 002 Success)');
});

// ada 2 cara prpindahan halaman pertama dengan route.get('denganRouterWajibRequire') dan app.get('tanpaRunter') seperti dibawah ini 

// app.get('/', function(req, resp){
//     resp.end('lancar expressnya');
// });

app.listen(9000, function(){
    console.log('I\'m listening 9000');
});