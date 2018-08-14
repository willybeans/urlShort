const express = require('express');
const app = express();
const router = express.Router();
const findOrCreateUrl = require('./find_or_create')

router.post('/shorturl/new', function (req, res, next) {
  let urlName = JSON.stringify(req.body.url);

  findOrCreateUrl(req.body.url)
    .then(data => {
      console.log("data before send: " + data);
      console.log("data.shortName before send: " + data.shortName);
        res.send({url: data})
    })
    .catch(err => console.error(err));
});


export default router;
