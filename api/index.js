import express from 'express';
import { MongoClient } from 'mongodb';
import config, { nodeEnv } from '../config';
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const dns = require('dns');
const router = express.Router();
const path = require('path');

require("dotenv").config({
  path: path.resolve(__dirname, '..', '.env'),
});
//require('dotenv').load();

const db = (nodeEnv === "development") ?
process.env.DEV_URI : process.env.MONGO_URI;

mongoose.connect(db,
   { useNewUrlParser: true })
   .then( (res) => {
     console.log('Connected to DB');
     console.log('DB: ' + db);
   }).catch((err) => {
     console.log('Connection failed');
     console.log(err);
   });

const Schema = mongoose.Schema;
const UrlSchema = new Schema({
  fullName: {type: String, required: true},
  shortName: {type: Number}
});
const Url = mongoose.model('Url', UrlSchema);

// app.use('/public', express.static(process.cwd() + '/public'));
//
// app.get('/', function(req, res){
//   res.sendFile(process.cwd() + '/views/index.ejs');
// });
//
// your first API endpoint...
router.post("/hello", function (req, res) {
  console.log("post successful!: " + req);
  console.log("req body: "  + JSON.stringify(req.body));
  console.log("req object?: " + req[0]);
  res.send({greeting: "hi from api"});
});

app.post('/shorturl/new', function (req, res, next) {
  //first regex the url
  //second DNS to see if its real
    // make me a promise b
  dns.lookup('test', (err, add, family) => {
    if (add === undefined) {
      //set variable to notify false url
    }
  });
  //then run the sequence youve written
  findOrCreateUrl(req.body.url)
    .then(data => {
        res.send({url: data})
    })
    .catch(err => console.error(err));
});

function findOrCreateUrl(url) {
  return findUrlByName(url)
    .then(data => data || findLastUrl())
    .then( data => { createAndSaveUrl(data, url) });
}

function findUrlByName(urlName) {
  return Url.findOne({fullName: urlName});
}

function findLastUrl() {
  return Url.find().limit(1).sort({$natural: -1});
}

function createAndSaveUrl(data, url) {
  let shortName;
  if(data['0'] != undefined){
    shortName = Number(data['0']['shortName']);
  }

  if (shortName === undefined) { //for first entry
    shortName = 0;
    console.log("data doesnt exist therefore shortname = " + shortName);
  } else {
    shortName++;
    console.log("data does exist shortname = " + shortName);
  }
  const ourUrl = new Url({
    fullName: url,
    shortName: shortName
  });
  return ourUrl.save();
};

export default router;
