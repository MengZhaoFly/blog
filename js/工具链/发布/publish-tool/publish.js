const http = require('http');
// const Buffer = require('buffer');
const querystring = require('querystring');
var archiver = require('archiver');
const fs = require('fs');
const child_process = require('child_process');


let projectName = 'dist'

// const postData = querystring.stringify({
//   'msg': 'Hello World!hahahha'
// });
// append files from a sub-directory, putting its contents at the root of archive

child_process.exec('open https://github.com/login/oauth/authorize?client_id=Iv1.1777370a84f1c7d7&redirect_uri=http:%2F%2Flocalhost:3001%2Fredirect&scope=read:user&state=abc123')

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return;
  pub(req, res);
}).listen(8080, () => {
  console.log(8080);
})

function pub(req, response) {
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  archive.directory('./dist/', false);
  archive.finalize();
  const options = {
    hostname: '127.0.0.1',
    port: 3001,
    path: `/?filename=${projectName}.html`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  };
  const request = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: `, JSON.stringify(res.headers, null, 2));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
      response.end('请求发布成功');
    });
  });
  
  request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // Write data to request body
  // req.write(postData);
  archive.pipe(request);
  archive.on('end', () => {
    request.end();
    console.log('开始请求发布');
  })
}