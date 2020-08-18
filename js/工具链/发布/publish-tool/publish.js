const http = require('http');
// const Buffer = require('buffer');
const querystring = require('querystring');
var archiver = require('archiver');
const fs = require('fs');
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

let projectName = 'dist'

// const postData = querystring.stringify({
//   'msg': 'Hello World!hahahha'
// });
// append files from a sub-directory, putting its contents at the root of archive
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

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: `, JSON.stringify(res.headers, null, 2));
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
// req.write(postData);
archive.pipe(req);
archive.on('end', () => {
  req.end();
})