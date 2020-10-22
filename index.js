

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
	'clientId': clientid,
	'clientSecret': ClientSecret  
}
axios({
	method:'post',
	url: process.env.autoURL+'v2/token',
	data: conData,
	headers:{
	'Content-Type': 'application/json',
	}
})
.then(function(response) {
	
	responsefromWeb.send('Authorization Sent');		
	token = response.data.access_token;				//Got the token
	console.log(token);
	
}).catch(function (error) {
	console.log(error);								//Authorization failed  	
	responsefromWeb.send(error);
});

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
	if(result){
        res.redirect('/success');
	}else{
		res.redirect('/error');
	}
	console.log(res);
});

app.listen(port, () => console.log('Gator app listening on port '+port+''));
