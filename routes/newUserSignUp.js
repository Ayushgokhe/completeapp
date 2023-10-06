var express = require('express');
var router = express.Router();
var { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const saltRounds = 5;
const publicKey = 'my private key'

// const client = new MongoClient('mongodb://127.0.0.1:27017')
const client = new MongoClient('mongodb+srv://Ayush:Ayush123@cluster0.r8ctdzd.mongodb.net/?retryWrites=true&w=majority')



/* POST home page. */
router.post('/', function (req, res, next) {
  var resObj = {}
  var reqObj = req.body
  bcrypt.hash(reqObj.password, saltRounds, function (err, hash) {
    console.log('Encrypted pwd is ' + hash);
    reqObj.password = hash

    getDbConnection1(reqObj)
      .then(() => {
        resObj.msg = 'Inserted'
        res.send(JSON.stringify(resObj))
      })
      .catch((error) => {
        resObj.msg = 'Error'
      })
      .finally(() => {
        // client.close()
      })
  });
});

async function getDbConnection1(data) {
  await client.connect();
  var db = client.db('tredningFashionStore')
  var collection = db.collection('userAccountDetails')
  collection.insertOne(data, () => {
    console.log('data instertedddddd')
  })
  return 'done'
}

module.exports = router;
