var express = require('express');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  // const filename = req.query.filename;
  const filename = 'dist';
  console.log(filename, req.body);
  const writePath = path.resolve(__dirname, `../../server/public/${filename}`);
  // fs.writeFileSync(writePath, JSON.stringify(req.body));
  // req.pipe(fs.createWriteStream(writePath));
  req.pipe(unzipper.Extract({ path: writePath }));
  req.on('end', () => {
    res.status(200).end('ok')
  }) 
});

module.exports = router;
