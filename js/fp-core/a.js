/* var newMethod = applyMiddleWare(rawMethod, middleware3, middleware2);
 * var x = newMethod(1); // 调用顺序：middleware2 -> middleware3 -> rawMethod，结果：x=3
 *
 * var newMethod2 = applyMiddleWare(newMethod, middleware1);
 * var y = newMethod2(10); // 调用顺序：middleware1 -> middleware2 -> middleware3 -> rawMethod，结果：y=13
 *
 */
function rawMethod(a) { 
  return a + 1 
}
function middleware1(next) {
  return function (a) {
    return next(a) + 1
  }
}
function middleware2(next) {
  return function (a) {
    return next(a) + 1
  }
}
function middleware3(next) {
  return function (a) {
    return next(a) + 1
  }
}
function applyMiddleWare(...args) {
  // your code here
  const raw = args.shift();
  const compose = (rest) => rest.reduce((fna, fnb) => (...params) => fna(fnb(...params)))
  const chain = compose(args.reverse());
  console.log(chain);
  return chain;

}
var newMethod = applyMiddleWare(rawMethod, middleware3, middleware2);
console.log(newMethod);
var x = newMethod(1); // 调用顺序：middleware2 -> middleware3 -> rawMethod，结果：x=3