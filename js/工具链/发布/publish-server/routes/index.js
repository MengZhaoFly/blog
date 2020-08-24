var express = require('express');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const https = require('https');
const axios = require('axios');
const querystring = require('querystring');
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


router.get('/redirect', async (req, res, next) => {
  // axios.get
  // console.log(req.url);
  const { code } = req.query
  let obj = {
    client_id: 'Iv1.1777370a84f1c7d7',
    client_secret: 'f76982ac490215ea8de8bebca45814f369bc07cc',
    code: code,
    redirect_uri: 'http://localhost:3001/redirect',
    state: 'abc123',
  }
  const params = querystring.stringify(obj);
  const options = {
    // http://neteasecloudmusicapi.zhaoboy.com/
    hostname: 'github.com',
    path: '/login/oauth/access_token?' + params,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  console.log(code);
  const request = https.request(options, (r) => {
    console.log(`状态码: ${r.statusCode}`);
    console.log(`响应头: ${JSON.stringify(r.headers)}`);
    r.setEncoding('utf8');
    let resText = ''
    r.on('data', (chunk) => {
      resText += chunk;
      // access_token=478006c42fab7dc2a8e281f8bfd235ae54596089&expires_in=28800&refresh_token=r1.daa2ee7afc79747798cd16e3acde504740f592404d6eaed8ec51f70f4555fb324281a78d5cbabcfb&refresh_token_expires_in=15897600&scope=&token_type=bearer
      console.log(`响应主体: ${chunk}`);
    });
    r.on('end', () => {
      console.log('响应中已无数据');
      let data = querystring.parse(resText) || {};
      const { access_token } = data;
      if (!access_token) {
        res.end('error');
        return;
      }
      res.writeHead(200, {
        'access_token': access_token,
      })
      res.end(`<a href="http://localhost:8080/?access_token=${access_token}">publish</a>`)
      // res.status(200).end(resText)
    });
  });
  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });
  
  // 将数据写入请求主体。
  // request.write(null);
  request.end();
  
})
router.get('/user', async (req, res) => {
  res.end('ok user');
})

module.exports = router;
