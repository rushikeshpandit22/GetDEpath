

const express = require('express');
//var jwt = require('jwt-simple'); 
//const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 3000;
var clientid = process.env.Client_Id;
var ClientSecret = process.env.Client_Secret;

//Connect with the Marketing cloud using client id and client secret

var conData = {
	"grant_type": "client_credentials",
	'client_id': clientid,
	'client_secret': ClientSecret,
	"account_id": "110007781"
}


// Main, error and success views

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});

app.get("/success", function (request, response) {
  response.sendFile(__dirname + '/success.html');
});
app.get("/error", function (request, response) {
  response.sendFile(__dirname + '/error.html');
});

app.post('/getDEpath', (req, res) => {
	
	var result = res;
		axios({
			method:'post',
			url: 'https://mcp77m41n18wgt8vbq2j9n10v1dq.auth.marketingcloudapis.com/v2/token',
			data: conData,
			headers:{
			'Content-Type': 'application/json',
			}
		})
		.then(function(response) {
			var DEprop = res.body.DEprop,value = res.body.DEval;
			console.log('Authorization Sent');		
			token = response.data.access_token;				//Got the token
			//console.log(token);
			res.redirect('/success');
			console.log(res.body[DEprop]);
			console.log('/n'+res.body);
			
		}).catch(function (error) {
			console.log(error);
			res.redirect('/error');
		});
	
});

app.listen(port, () => console.log('Gator app listening on port '+port+''));
