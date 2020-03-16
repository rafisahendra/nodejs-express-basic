// http://localhost/howControlThis/This/asd/sd
var express = require('express');
var app     = express();
var router  = express.Router();

app.use('/users', router); //router disini intanisasi untuk reouter.get()

router.get('/:username(\\w+)', function(req, resp){
    resp.end(JSON.stringify(req.params));
});


app.listen(9000, function(){
    console.log('I\'m listening 9000');
});