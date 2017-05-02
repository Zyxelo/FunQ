import {MongoClient} from 'mongodb';

let mdb;

export default {
    conncectToServer: (callback) => {
        MongoClient.connect(config.mongodbUri, (err, db) => {
            assert.equal(null, err);
            mdb = db;
            return callback(err);
        })
    },
    getDb: () => {
        return mdb;
    }


}


