var compression = require('compression');
var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var router = express.Router();

// Middlewares

//Compress our responses
app.use(compression());

app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8000);



app.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }));
app.use(cors());
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');

router.get('/hh',function(req,res,next) {
  // res.render('public/index2.html')
  res.render('index2',{})
})
router.get('/vinoce',function(req,res,next) {
  // res.render('public/index2.html')
  res.render('vinoce/index',{})
})

app.use('/',router);


app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });
});

//mail
app.post('/endpoint',function (req,res) {
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: 'anuarbekzakirianov97@gmail.com',
      pass: 'a********'
    }
  }));

  var mailOptions = {
    from: 'anuarbekzakirianov97@gmail.com', // sender address
    to: 'anuarbekzakirianov97@gmail.com', // list of receivers
    subject: 'ЗАКАЗ', // Subject line
    text: "Пришел заказ на '"+req.body.currentProduct+"' от " + req.body.name + ". Номер " + req.body.number
  };

  transport.sendMail(mailOptions, function (error) {
    if (error) {
      console.log('Error occured');
      console.log(error.message);
      return;
    }
    res.send({"success": "success"});
  });
});

// Start server
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
