const express = require('express');
const app = express();
const router = express.Router();
const find_or_create = require('./find_or_create')

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


router.post('/shorturl/new', function (req, res, next) {

  find_or_create.findOrCreateUrl(req.body.url)
    .then(data => {
      res.send({url: data});
    })
    .catch(err => console.error(err));
});


export default router;
