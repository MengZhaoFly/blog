console.log('a 开始');
module.exports.done = false;
const b = require('./b.js');
console.log('在 a 中，b.done = %j', b.done);
module.exports.done = true;
console.log('a 结束');