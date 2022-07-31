const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    mongoClient.connect(
        'mongodb+srv://pratham:PrathamNodeShop@cluster0.x0flmfl.mongodb.net/shop?retryWrites=true&w=majority'
    ).then(client => {
        console.log('Connected!');
        _db = client.db();
        cb();
    }).catch(err => {
        console.log(err);
    })
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No DB Found !';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;