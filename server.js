const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoDB = require('./mongo.js').MongoDB;
const cors = require('cors');
const utils = require('./utils.js');

const MAX_AUTH_ATTEMPTS = 5;
const AUTH_COOLDOWN_TIME_MINUTES = 5;
const ENABLE_AUTH_VALIDATION_ENDPOINT = false;

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/api/auth', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res.status(400).json({error: 'Username not provided'});
        return;
    }

    if (!password) {
        res.status(400).json({error: 'Password not provided'});
        return;
    }

    const hashedPassword = utils.getHash(password);

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const date = new Date();
    date.setMinutes(date.getMinutes() - AUTH_COOLDOWN_TIME_MINUTES);

    MongoDB(
        'blog',
        'logins',
        function (collection, closeDBConnection) {
            collection.count(
                {
                    ip: ip,
                    date: {$gt: date},
                    successful: false
                }
            ).then(
                function (attempts) {
                    console.log('This ip made ' + attempts + ' unsuccessful attempts since ' + date.toTimeString());

                    if (attempts < MAX_AUTH_ATTEMPTS) {
                        utils.login(
                            username,
                            hashedPassword,
                            function (token) {
                                collection.insertOne({
                                        date: new Date(),
                                        username: username,
                                        password: hashedPassword,
                                        ip: ip,
                                        successful: true,
                                        capped: false
                                    },
                                    function () {
                                        closeDBConnection();
                                    });

                                res.json({secret: token});
                            },
                            function () {
                                collection.insertOne({
                                        date: new Date(),
                                        username: username,
                                        password: hashedPassword,
                                        ip: ip,
                                        successful: false,
                                        capped: false
                                    },
                                    function () {
                                        closeDBConnection();
                                    });

                                res.status(401).json({error: 'Login failed'});
                            }
                        );
                    }
                    else {
                        collection.insertOne({
                                date: new Date(),
                                username: username,
                                password: hashedPassword,
                                ip: ip,
                                successful: false,
                                capped: true
                            },
                            function () {
                                closeDBConnection();
                            });

                        res.status(401).json({error: 'Too many unsuccessful attempts attempts'});
                    }
                }
            );
        },
        function () {
            res.status(400).json({error: 'Could not get entry: DB connection failed.'});
        }
    );
});

app.post('/api/validate', function (req, res) {
    if (ENABLE_AUTH_VALIDATION_ENDPOINT) {
        const secret = req.body.secret;
        console.log(secret);
        utils.validateToken(
            secret,
            function () {
                res.json({result: 'success'});
            },
            function () {
                res.json({result: 'failure'});
            }
        );
    }
    else {
        res.json({result: 'failure'});
    }
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
                    date: new Date(),
                    email: email,
                    subject: subject,
                    message: message
                },
                function (error) {
                    if (error) {
                        res.status(400).json({error: 'Could not send message: Insert failed.'});
                    }
                    else {
                        res.json({result: 'Message was sent.'});
                    }
                    closeDBConnection();
                }
            );
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
            const cursor = collection.find();
            const entries = [];

            cursor.sort({date: -1});
            cursor.each(
                function (error, result) {
                    if (error) {
                        res.status(404).json({error: 'Could not find any entries'});
                        closeDBConnection();
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
                {id: req.params.id},
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

app.put('/api/blog', function (req, res) {
    const auth = req.body.auth;
    const isNew = req.body.isNew;
    const isIdUpdate = req.body.isIdUpdate;
    const date = req.body.date;
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body;
    const author = req.body.author;

    if (!auth) {
        res.status(401).json({error: 'Auth failed'});
        console.log('Auth failed');
        return;
    }

    if (!date) {
        res.status(400).json({error: 'Date invalid'});
        console.log('Date invalid');
        return;
    }

    if (!id) {
        res.status(400).json({error: 'Id invalid'});
        console.log('Id invalid');
        return;
    }

    if (!title) {
        res.status(400).json({error: 'Title invalid'});
        console.log('Title invalid');
        return;
    }

    if (!body) {
        res.status(400).json({error: 'Body invalid'});
        console.log('Body invalid');
        return;
    }

    if (!author) {
        res.status(400).json({error: 'Author invalid'});
        console.log('Author invalid');
        return;
    }

    if (isIdUpdate === 'true') {
        res.status(400).json({error: 'Id updates are not supported'});
        console.log('Id updates are not supported');
        return;
    }

    //TODO: Backoff for validation
    utils.validateToken(
        auth,
        function () {
            MongoDB(
                'blog',
                'entry',
                function (collection, closeDBConnection) {
                    collection.findOne(
                        {id: id},
                        function (error, result) {
                            if (error || !result) {
                                console.log('No entry with id; ' + id + ', creating entry');
                                collection.insertOne(
                                    {
                                        id: id,
                                        date: new Date(date),
                                        title: title,
                                        body: body,
                                        author: author
                                    },
                                    function (error, result) {
                                        if (error) {
                                            console.log('Failed to create entry with id; ' + id);
                                            res.status(400).json({error: 'Could not save blog entry.'});
                                        }
                                        else {
                                            console.log('Entry with id; ' + id + ', created');
                                            res.json({result: 'Blog entry was saved.'});
                                        }
                                        closeDBConnection();
                                    }
                                );
                            }
                            else {
                                if (isNew === 'false') {
                                    console.log('Entry with id; ' + id + ' exists and will be updated');
                                    collection.updateOne(
                                        {
                                            id: id
                                        },
                                        {
                                            id: id,
                                            date: new Date(date),
                                            title: title,
                                            body: body,
                                            author: author
                                        },
                                        function (error, result) {
                                            if (error) {
                                                console.log('Failed to update entry with id; ' + id);
                                                res.status(400).json({error: 'Could not update blog entry.'});
                                            }
                                            else {
                                                console.log('Entry with id; ' + id + ', updated');
                                                res.json({result: 'Blog entry was updated.'});
                                            }
                                            closeDBConnection();
                                        }
                                    );
                                }
                                else {
                                    console.log('Entry with id; ' + id + ' exists, collision');
                                    res.status(400).json({error: 'Blog entry id collision for new entry.'});
                                    closeDBConnection();
                                }
                            }
                        }
                    );
                },
                function () {
                    res.status(400).json({error: 'Could not get entry: DB connection failed.'});
                }
            );
        },
        function () {
            res.status(401).json({error: 'Auth failed'});
        }
    );
});

app.delete('/api/blog', function (req, res) {
    const auth = req.body.auth;
    const id = req.body.id;

    if (!auth) {
        res.status(401).json({error: 'Auth failed'});
        console.log('Auth failed');
        return;
    }

    if (!id) {
        res.status(400).json({error: 'Id invalid'});
        console.log('Id invalid');
        return;
    }

    //TODO: Backoff
    utils.validateToken(
        auth,
        function () {
            MongoDB(
                'blog',
                'entry',
                function (entryCollection, closeEntryDBConnection) {
                    entryCollection.findOne(
                        {
                            id: id
                        },
                        function (error, result) {
                            if (error || !result) {
                                res.status(404).json({error: 'Could not find an entry with id ' + id});
                                closeEntryDBConnection();
                            }
                            else {
                                MongoDB(
                                    'blog',
                                    'entry_archive',
                                    function (archiveCollection, closeArhiveDBConnection) {
                                        archiveCollection.insertOne(
                                            result,
                                            function (error) {
                                                if (error) {
                                                    res.status(404).json({error: 'Could not copy entry with id ' + id + ' to archive'});
                                                }
                                                else {
                                                    entryCollection.remove(
                                                        {id : id},
                                                        function (error, result) {
                                                            if (error || !result) {
                                                                res.status(404).json({error: 'Could not remove entry with id ' + id});
                                                            }
                                                            else {
                                                                res.json({result: 'success'});
                                                            }
                                                            closeEntryDBConnection();
                                                        }
                                                    )
                                                }
                                                closeArhiveDBConnection();
                                            }
                                        )
                                    },
                                    function () {
                                        res.status(400).json({error: 'Could not get entry archive: DB connection failed.'});
                                    }
                                );
                            }
                        }
                    )
                },
                function () {
                    res.status(400).json({error: 'Could not get entry: DB connection failed.'});
                }
            );
        },
        function () {
            res.status(401).json({error: 'Auth failed'});
        }
    );
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});