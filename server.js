var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoDB = require('./mongo.js').MongoDB;
var cors = require('cors');

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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

    MongoDB(
        'contact',
        'message',
        function (collection, closeDBConnection) {
            collection.insertOne({
                    "date": new Date(),
                    "email": email,
                    "subject": subject,
                    "message": message
                },
                function (error, result) {
                    if (error) {
                        res.status(400).json({error: 'Could not send message: Insert failed.'});
                    }
                    else {
                        res.json({result: 'Message was sent.'});
                    }
                    closeDBConnection();
                });
        },
        function () {
            res.status(400).json({error: 'Could not send message: DB connection failed.'});
        }
    );
});

app.get('/api/blog', function (req, res) {
    MongoDB(
        'blog',
        'entry',
        function (collection, closeDBConnection) {
            var cursor = collection.find();
            var entries = [];
            cursor.each(
                function (error, result) {
                    if (error) {
                        res.status(404).json({error: 'Could not find any entries'});
                    }
                    else if (!result) {
                        res.json(entries);
                        closeDBConnection();
                    }
                    else {
                        entries.push(result);
                    }
                }
            );
        },
        function () {
            res.status(400).json({error: 'Could not get entry: DB connection failed.'});
        }
    );
});

app.get('/api/blog/:id', function (req, res) {
    MongoDB(
        'blog',
        'entry',
        function (collection, closeDBConnection) {
            collection.findOne(
                {"id": req.params.id},
                function (error, result) {
                    if (error || !result) {
                        res.status(404).json({error: 'Could not find an entry with id ' + req.params.id});
                    }
                    else {
                        res.json(result);
                    }
                    closeDBConnection();
                }
            );
        },
        function () {
            res.status(400).json({error: 'Could not get entry: DB connection failed.'});
        }
    );
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});