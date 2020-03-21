var express   =   require('express');
var mysql     =   require('mysql');
var hbs       =   require('hbs');
var bodyParser= require('body-parser');
var path      = require('path');
var sessionfuu= require('express-session');
var session;
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
        // console.log('terhubung ke database'); 
    }
});


app.use('/cssFiles',express.static(__dirname + '/public')); //Set Css view
app.set('views',path.join(__dirname, 'views')); //Set directory view
app.set('view engine','hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(sessionfuu({
    secret:'^%^&%^UHJ&TGYJGUJG*U',
    resave : false,
    saveUninitialized:true
    
}));


// Cek Session di Home admin
app.get('/home',function(req, resp){
  session = req.session;
  if(session.uniqueIdUlevel != 'admin'){
      resp.redirect('/');  
      }else{
        let sql = "SELECT * FROM tbl_karyawan";
        let querySql = koneksi.query(sql, function(err, rows , field) {
        if(err) throw err;
        resp.render('expData',{
          karyawan : rows,
          tittle   : "Halaman Admin"
          });
        });
     
      }
});

/// tambah data denga Method Get(body) req.body.value

app.post('/tambahData', function(req , resp) {
  let sql = "INSERT INTO tbl_karyawan SET ?";
  let data = {nik: req.body.nik, nama_karyawan: req.body.nama, alamat: req.body.alamat };
  let querySql = koneksi.query(sql, data, function(err, results) {
    if(err) throw err;
    resp.redirect('/home');
  });

});
 

// update data denga Method Get(query) req.query.value
app.get('/updateData',(req, resp) => {
  let sql = "UPDATE tbl_karyawan SET nik='"+req.query.nik+"', nama_karyawan='"+req.query.nama_karyawan+"',alamat='"+req.query.alamat+"' WHERE id_karyawan="+req.query.id_karyawan;
  let querySql = koneksi.query(sql, (err, rows) => {
    if(err) throw err;
    resp.redirect('/home');
  });
});
 
// delete data denga Method Get(query) req.query.value
app.get('/deleteData',(req, resp) => {
  let sql = "DELETE FROM tbl_karyawan WHERE id_karyawan="+req.query.id_karyawan+'';
  let querySql = koneksi.query(sql, (err, rows) => {
    if(err) throw err;
      resp.redirect('/home');
  });
});


// ===================================== Untuk Login ==========================================

app.get('/', (req, resp) =>{  
  resp.render('login');
});

app.post('/login_cek', function(req, resp){
  session = req.session;
  koneksi.query("SELECT * from tbl_admin", function(error, rows, field){
    if(!!error){
        console.log('Error Login');
    }else{
        // console.log('Succesfull Login!\n'); 
        if(req.body.email == rows[0].email && req.body.password == rows[0].password){
          session.uniqueIdUname_lengkap = rows[0].nama_lengkap;
          session.uniqueIdUlevel = rows[0].level;
          // console.log( session.uniqueIdUname_lengkap);
          // console.log( session.uniqueIdUlevel);
          resp.redirect('/home');
      }else{
        resp.redirect('/');
      }
     }
  });
    
});
 
app.get('/logout', (req, resp) =>{
  req.session.destroy(function(error){
      //  console.log(error);
       resp.redirect('/');

  })
});

// =========================================== end login ========================================

const port = 9000;
app.listen(port, () => 
console.log(`Server running on port ${port}!`));




