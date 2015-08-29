'use strict';

var http = require('http');
var app = require('express')();
var path = require('path');
var kraken = require('kraken-js');
//var expressHbs = require('express-handlebars');
//var app = express();

//var bodyParser = require('body-parser')
/*
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
*/
app.set('port',8004);
app.use(kraken());
//app.set('views',path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname,'views')));
/*
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');
*/

/*
app.get('/',function(req,res){
	res.render('home');
});
*/
/*
app.post('/',function(req,res){
var un = req.body.username;
var pw = req.body.password;
console.log("Username: " + un);
console.log("Password: " + pw);

var config = {
    scheme: 'http',
    host: 'stage2std095.qa.paypal.com',
    port: '12254',
    path: '/webapps/servicebridge/services/invoke',
    rejectUnauthorized: false
};

var AdminAuthServ = require("./models/login/node-adminauthserv/index.js");
var adminauthservClient = new AdminAuthServ(config);
//var assert = require('assert');
//"allcspt"
//"111111$$"
		var payload = {
			username: un,
      		password: pw
		};
		
		adminauthservClient.login(payload, function (error, result) {
			//assert(!error && result && result.body);
			//assert(result.statusCode === 200);
			//assert(result.body.operationResult === 0);
			console.log("authenticatedToken: " + result.body.authenticatedToken);
			console.log("Error: " + error);
		});
});
*/

app.listen(app.get('port'));
console.log('running express...');


