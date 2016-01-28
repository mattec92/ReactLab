var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.get('/api/hello', function(req, res) {
	res.send('Hello World!');
});

app.listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});