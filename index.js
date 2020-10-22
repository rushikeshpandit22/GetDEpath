
const aws = require('aws-sdk');
const express = require('express');
var jwt = require('jwt-simple'); 
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

var port = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var clientid = process.env.Client_Id;
var ClientSecret = process.env.Client_Secret;
console.log(clientid);
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
