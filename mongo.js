const MongoClient = require('mongodb').MongoClient, format = require('util').format;
const MongoBaseUrl = 'mongodb://127.0.0.1:27017/';

module.exports = {
    MongoDB: function (databaseName, collectionName, onSuccess, onFailure) {
        MongoClient.connect(MongoBaseUrl + databaseName, function (error, db) {
            if (error) {
                onFailure();
            } else {
                const collection = db.collection(collectionName);
                onSuccess(
                    collection,
                    function () {
                        db.close();
                    }
                );
            }
        });
    }
};