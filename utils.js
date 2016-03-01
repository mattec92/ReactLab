const crypto = require('crypto');
const MongoDB = require('./mongo.js').MongoDB;

const getHash = function (input) {
    return crypto.createHash('sha256').update(input).digest('base64');
};

const getUserAsJSON = function (username, password) {
    return JSON.stringify({
        username: username,
        password: this.getHash(password)
    });
};

const getServerSecret = function (onSuccess, onFailure) {
    MongoDB(
        'blog',
        'user',
        function (collection, closeDBConnection) {
            collection.findOne(
                {username: "server"},
                function (error, result) {
                    if (error || !result) {
                        console.log('User not found with username: ' + username);
                        closeDBConnection();
                        onFailure();
                    }
                    else {
                        closeDBConnection();
                        onSuccess(result.password);
                    }
                }
            );
        },
        function () {
            console.log('Could not connect to DB.');
            onFailure();
        }
    );
};

const login = function (username, password, onSuccess, onFailure) {
    MongoDB(
        'blog',
        'user',
        function (collection, closeDBConnection) {
            collection.findOne(
                {username: username},
                function (error, result) {
                    if (error || !result) {
                        console.log('User not found with username: ' + username);
                        closeDBConnection();
                        onFailure();
                    }
                    else {
                        if (result.password === password) {
                            const date = new Date();
                            date.setHours(date.getHours() + 1);
                            date.setMinutes(0);
                            date.setSeconds(0);
                            date.setMilliseconds(0);

                            getServerSecret(
                                //onSuccess
                                function (serverSecret) {
                                    const hmac = crypto.createHmac('sha256', serverSecret);
                                    hmac.update(JSON.stringify({expiresAt: date.toDateString()}));
                                    const token = hmac.digest('base64');

                                    console.log('Created token:' + token + ', valid until: ' + date.toDateString() + ' ' + date.toTimeString());
                                    onSuccess(token);
                                },
                                //onFailure
                                function () {
                                    onFailure();
                                }
                            );
                            closeDBConnection();
                        }
                        else {
                            console.log('Password was wrong');
                            closeDBConnection();
                            onFailure();
                        }
                    }
                }
            );
        },
        function () {
            console.log('Could not connect to DB.');
            onFailure();
        }
    );
};

const validateToken = function(token, onSuccess, onFailure) {
    getServerSecret(
        //onSuccess
        function (serverSecret) {
            const date = new Date();
            date.setHours(date.getHours() + 1);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            const hmac = crypto.createHmac('sha256', serverSecret);
            hmac.update(JSON.stringify({expiresAt: date.toDateString()}));
            const encrypted = hmac.digest('base64');

            if (token === encrypted) {
                onSuccess();
                return;
            }

            onFailure();
        },
        //onFailure
        function () {
            onFailure();
        }
    );
};

module.exports = {
    getHash,
    getUserAsJSON,
    getServerSecret,
    login,
    validateToken
};