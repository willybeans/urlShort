const express = require('express');
const app = express();
const router = express.Router();
const find_or_create = require('./find_or_create')
const dns = require('dns');

router.get('/:shortUrl', function (req, res, next) {

  find_or_create.findUrl(req.params.shortUrl)
    .then(data => {
      try {
        res.redirect(301,
          'http' + (req.socket.encrypted ? 's' : '')
          + '://www.' + data.fullName
        );
      }
      catch (error) {
        res.send({
          msg: error,
          status: 'Could not re-route',
          url: data.fullName
        });
      }
      //  ;res.send({ url: data.fullName});
    })
    .catch(err => err);

});

function testfunc(url){
  return new Promise((resolve, reject) => {
    dns.resolve(url, (error, addresses) => {
      if (error) {
        reject (error);
      }
      resolve(addresses);
    });
  })
}

router.post('/shorturl/new', function (req, res, next) {
  testfunc(req.body.url)
    .then(data => {
      if(data) {
        find_or_create.findOrCreateUrl(req.body.url)
          .then(data => {
            res.send({url: data});
          });
      }
    })
    .catch(err => res.send({url: err}));

});


export default router;
