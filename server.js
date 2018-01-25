require('app-module-path').addPath(__dirname + '/mailapi');
var express=require('express');
var nodemailer = require("nodemailer");
bodyParser = require('body-parser');
//var routes = require('./routers/route'); //importing route
//var router = express.Router();


var app = express()
var port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   if (req.method === 'Options') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
//     return res.status(200).json({});
//   }
// });


var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "",
        pass: ""
    }
});

app.get('/',function(req,res){
    res.sendfile('index.html');
});

app.get('/hello', function(req, res){
		res.end('Hello Hi everyone');
});


app.post('/send',function(req,res){
    var mailInfo={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailInfo);
    smtpTransport.sendMail(mailInfo, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
	});
});





app.listen(port);
console.log('todo list RESTful API server started on: ' + port);