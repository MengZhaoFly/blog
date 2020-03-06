const fs = require('fs');

fs.readFile('./timeout.js', () => {
  setTimeout(() => {
   console.log('setTimeout') 
  });
  setImmediate(() => {
    console.log('setImmediate')
  })
})

// io 阶段 -》check