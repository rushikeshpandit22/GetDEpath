
const aws = require('aws-sdk');
const express = require('express');
var port = process.env.PORT || 3000;
const app = express();
app.use(express.static('public'));

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
	var result = false;
	if(result){
        res.redirect('/success');
	}else{
		res.redirect('/error');
	}
});

app.listen(port, () => console.log('Gator app listening on port '+port+''));