console.log('main 开始');
const b = require('./b.js');
const a = require('./a.js');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);
/**
 * CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
 */