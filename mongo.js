const MongoClient = require('mongodb').MongoClient, format = require('util').format;
const MongoBaseUrl = 'mongodb://127.0.0.1:27017/';

module.exports = {
    MongoDB: function (databaseName, collectionName, callback) {
        MongoClient.connect(MongoBaseUrl + databaseName, function (error, db) {
            if (error) {
                throw error;
            } else {
                console.log("Successfully connected to the database");
                const collection = db.collection(collectionName);
                callback(
                    collection,
                    function () {
                        db.close();
                    }
                );
            }
        });
    }
};