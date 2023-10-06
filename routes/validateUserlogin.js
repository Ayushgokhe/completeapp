var express = require('express')
var router = express.Router();
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const saltRounds = 5;
const publicKey = 'my private key'

// const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient('mongodb+srv://Ayush:Ayush123@cluster0.r8ctdzd.mongodb.net/?retryWrites=true&w=majority')


router.post('/', function (req, res, next) {
    var responseObj = {}
    getDbConnection(req.body)
        .then((document) => {
            if (document.length) {
                bcrypt.compare(req.body.password, document[0].password, function (err, result) {
                    // console.log('Encrypted pwd is ' + hash);
                    // reqObj.password = hash
                    if(result){
                        responseObj.msg = 'valid'
                    }else{
                        responseObj.msg = 'inValid'
                        responseObj.error = 'Invalid Password'
                    }
                    res.send(JSON.stringify(responseObj)) 
                })
            } else {
                console.log('inValid user')
                responseObj.msg = 'inValid'
                responseObj.error = 'Invalid User Id'
                res.send(JSON.stringify(responseObj))
            }
            console.log('Done with job')
        })
        .catch(console.error)
        .finally(() => client.close());




    // if(req.body.accountId == 'ayush' && req.body.password == '1234'){
    //     responseObj.msg = 'valid';
    // }else{
    //     responseObj.msg = 'inValid'
    // }

    // res.send(JSON.stringify(responseObj));
})

async function getDbConnection(reqData) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db('tredningFashionStore');
    const collection = db.collection('userAccountDetails')
    // var result = collection.find({}.toArray())
    var result = collection.find({ accountId: reqData.accountId }).toArray();
    return result;
}



module.exports = router;
