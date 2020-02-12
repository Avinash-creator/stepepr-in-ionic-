var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var mysql=require('mysql');
var path = require('path');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./assets/imgs");
	},
   filename: (req, file, cb) => {
     cb(null, (file.filename = file.originalname));
   }
 });
 var upload = multer({ storage: storage });



var connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'stepper'
});

var app = express();

app.set('views', './dist/browser');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("./assets/imgs"));

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'imgs')));

connection.connect(function(err){
if(err) throw err;
console.log("mysql Connected!.");
});

app.post("/upload",upload.single("file"),(req,res)=>{
  var sql="INSERT INTO image(file)values('"+req.body.file+"')";
  connection.query(sql,function(err,rows)
  {

	  if(err) throw err;
	  if(rows)

console.log(rows);
  });
  });
app.post('/posts',function(req,res){
    var sql = "INSERT INTO form (Name,Email,Id,StarName,Options)values('"+req.body.Name+"','"+req.body.Email+"','"+req.body.Id+"','"+req.body.StarName+"','"+req.body.Options+"')";
    connection.query(sql,function(err,result){
    if(err)throw err;

    else
    {
      (result)
    }
    });
});

app.post('/coupencode',function(req,rs){
var sql= "INSERT INTO coupencode (Coupencodename)values('"+req.body.coupencodename+"')";
connection.query(sql,function(err,result){
if(err)throw err;
else{
  (result)
}
});
});

app.post('/date',function(req,res){
var sql="INSERT INTO date (birthgirl,startdate,enddate)values('"+req.body.birthgirl+"','"+req.body.startdate+"','"+req.body.enddate+"')";
connection.query(sql,function(err,result){
if(err)throw err;
else{
(result)
}
});
});

app.post('/details',function(req,res){
var sql="INSERT INTO details (email,name,options,phonenumber,message)values('"+req.body.email+"','"+req.body.name+"','"+req.body.options+"','"+req.body.phonenumber+"','"+req.body.message+"')";
connection.query(sql,function(err,result){
if(err)throw err;
else{
  (result)
}
});
});


app.get('/',function(req,res){
  
  connection.query('SELECT * FROM form', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows)
    res.json(rows);
  
  });
  });
app.get('/upload',function(req,res){
connection.query('SELECT * FROM images',(err,rows)=>{
if(err) throw err;
console.log(rows);

});
});
app.listen(4200,function(req,res){
  console.log("server started on port 4200");
});
