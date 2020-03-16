var express =   require('express');
var mysql   =   require('mysql');

var app  = express();
var koneksi = mysql.createPool({
    connectionLimit:50,
    host    :'localhost',
    user    :'root',
    password:'',
    database:'db_express'
});

app.get('/', function(req, resp){
    koneksi.getConnection(function(error, tempCont){
        if(!!error){
            tempCont.release();
            console.log('Error !');
        }else{
            console.log('Connected !\n'); 
            tempCont.query("SELECT * from tbl_karyawan", function(error, rows, field){
                if(!!error){
                    tempCont.release();
                    console.log('Error !');
                }else{
                   resp.json(rows)
                    
                }
            });
        }
    });
});


app.listen(9000,function(){
console.log('runing server 9000');
});
