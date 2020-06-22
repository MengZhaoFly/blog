const asyncPool = require('tiny-async-pool');
const timeout = i => new Promise(resolve => {
  setTimeout(() => {
    console.log(`${i} is resolve`);
    resolve(i)
  }, i)
});
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(console.log)