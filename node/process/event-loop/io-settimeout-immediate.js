const fs = require('fs');
require('http').createServer((req, res) => {
  // req/res:   IncomingData
  // IO
})
//  IO
fs.readFile('./timeout.js', () => {
  // 1:poll
  // 3: timer
  setTimeout(() => {
   console.log('setTimeout') 
  });
  // 2: check
  setImmediate(() => {
    console.log('setImmediate')
  })
})
//



// io 阶段 -》check