import express from 'express';
import { MongoClient } from 'mongodb';
import config, { nodeEnv } from '../config';

const mongo = require('mongodb'),
      mongoose = require('mongoose'),
      app = express(),
      dns = require('dns'),
      router = express.Router(),
      path = require('path');

//import .env file for mongoDB URI
require("dotenv").config({
  path: path.resolve(__dirname, '..', '.env'),
});
//require('dotenv').load();

const db = (nodeEnv === "development") ?
process.env.DEV_URI : process.env.MONGO_URI;

mongoose.Promise = global.Promise;
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

router.post('/shorturl/new', function (req, res, next) {
  let urlName = JSON.stringify(req.body.url);
  // dns.lookup('test', (err, add, family) => {
  //   if (add === undefined) {
  //     //set variable to notify false url
  //   }
  // });
  findOrCreateUrl(req.body.url)
    .then(data => {
      console.log("data before send: " + data);
      console.log("data.shortName before send: " + data.shortName);
        res.send({url: data})
    })
    .catch(err => console.error(err));
});

function findOrCreateUrl(urlName) {
  return findUrlByName(urlName)
    .then( data => {
      if (data)
        return data;
      return findLastUrl()
    })
    .then( data => {
      return createNewUrl(data.shortName, urlName);
    });
}

// function findOrCreateUrl(urlName) {
//   return findUrlByName(urlName)
//     .then(data => data || findLastUrl())
//     .then( data => { createAndSaveUrl(data, urlName) });
// }

function findUrlByName(urlName) {
  return Url.findOne({fullName: urlName});
}

function findLastUrl() {
  console.log('findLAST fired');
  //this query is being flattened from data['0']
  return Url.find().limit(1).sort({$natural: -1})
    .then(data => data && data.length && data[0]);
}

function createNewUrl(shortName, urlName) {
  if (shortName != undefined){
    shortName = Number(shortName);
  }
  if (shortName === undefined) { //for first entry
    shortName = 0;
    console.log("data doesnt exist therefore shortname = " + shortName);
  } else {
    shortName++;
    console.log("data does exist shortname = " + shortName);
  }
  const ourUrl = new Url({
    fullName: urlName,
    shortName: shortName
  });
  return ourUrl.save();
};

export default router;
