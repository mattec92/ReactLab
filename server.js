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
    const evaluatePt1 = req.body.evaluatePt1;
    const evaluatePt2 = req.body.evaluatePt2;
    const evaluateResult = req.body.evaluateResult;

    if (evaluatePt1 + evaluatePt2 !== evaluateResult) {
        res.status(400).json({error: 'Evaluation failed'});
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

    //TODO: Do email validation
    //if (!emailValid) {
    //
    //}

    res.json({result: 'Email was sent'});
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});