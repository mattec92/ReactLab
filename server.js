var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/hello', function (req, res) {
    res.send('Hello World!');
});

app.post('/api/contact', function (req, res) {
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;
    const validationPt1 = parseInt(req.body.validationPt1);
    const validationPt2 = parseInt(req.body.validationPt2);
    const validationResult = parseInt(req.body.validationResult);

    if (validationPt1 + validationPt2 !== validationResult) {
        res.status(400).json({error: 'Validation failed'});
        return;
    }

    if (!email) {
        res.status(400).json({error: 'Email not provided'});
        return;
    }

    if (!subject) {
        res.status(400).json({error: 'Subject not provided'});
        return;
    }

    if (!message) {
        res.status(400).json({error: 'Message not provided'});
        return;
    }

    const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    if (!emailRegex.test(email)) {
        res.status(400).json({error: 'Email not valid'});
        return;
    }

    res.json({result: 'Email was sent'});
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});