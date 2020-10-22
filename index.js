

const express = require('express');
//var jwt = require('jwt-simple'); 
//const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');

var port = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var clientid = process.env.Client_Id;
var ClientSecret = process.env.Client_Secret;

//Connect with the Marketing cloud using client id and client secret

var conData = {
	'clientId': process.env.CLIENT_ID,
	'clientSecret': process.env.CLIENT_SECRET  
}
axios({
	method:'post',
	url:'https://auth.exacttargetapis.com/v1/requestToken',
	data: conData,
	headers:{
	'Content-Type': 'application/json',
	}
})
.then(function(response) {
	console.log(response);
	responsefromWeb.send('Authorization Sent');		
	token = response.data.accessToken;				//Got the token

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
	
	var result = true;
	if(result){
        res.redirect('/success');
	}else{
		res.redirect('/error');
	}
});

app.listen(port, () => console.log('Gator app listening on port '+port+''));
