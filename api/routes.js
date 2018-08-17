const express = require('express');
const app = express();
const router = express.Router();
const find_or_create = require('./find_or_create')

router.get('/:shortUrl', function (req, res) {
  find_or_create.findUrl(req.params.shortUrl)
    .then(data => {
      res.send({ url: data});
    })
    .catch(err => err);
  //res.redirect('www.google.com');
});


router.post('/shorturl/new', function (req, res, next) {

  find_or_create.findOrCreateUrl(req.body.url)
    .then(data => {
      res.send({url: data});
    })
    .catch(err => console.error(err));
});


export default router;
