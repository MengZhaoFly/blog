console.log('b 开始');
module.exports.done = false;
const a = require('./a.js');
console.log('在 b 中，a.done = %j', a.done);
module.exports.done = true;
console.log('b 结束');