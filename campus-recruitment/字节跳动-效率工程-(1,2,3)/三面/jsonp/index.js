const http = require('http');

http.createServer((req, res) => {
  // /api/books?callback=getbook  pathname
  const url = require('url').parse(req.url);
  if (url.pathname === '/api/books') {
    const methodName = url.query && url.query.split('=')[1];
    console.log(methodName);
    let list = [ { book: 'book2'} ];
    res.end(`${methodName}(${JSON.stringify(list)})`);
  }
})
.listen(3002, () => {
  console.log('server is running http://localhost:3002');
})