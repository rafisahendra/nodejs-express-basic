var express =   require('express');
var mysql   =   require('mysql');

var app  = express();

var koneksi = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'',
    database:'db_express'
});

koneksi.connect(function(error){
    if(!!error){
        console.log('error koneksi');
    }else{
        console.log('terhubung ke database'); 
    }
});

app.get('/', function(req, resp){
    //about Mysql
    koneksi.query("SELECT * from tbl_karyawan", function(error, rows, field){
        if(!!error){
            console.log('Error In the query');
        }else{
            console.log('Succesfull in the query!\n'); 
            console.log(rows); 
            resp.send  ('hello, '+rows[0].nama_karyawan ); 
        }
    });

});


app.listen(9000,function(){
// console.log('runing server 9000');
});
