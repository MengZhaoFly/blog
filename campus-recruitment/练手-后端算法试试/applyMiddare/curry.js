/**
 * 
 * function currying(fn){
    var allArgs = [];
    return function next(){
        var args = [].slice.call(arguments);
        if(args.length > 0){
            allArgs = allArgs.concat(args);
            return next;
        }
    } 
}
 */

function currying(fn){
  var allArgs = []; // 用来接收参数
  return function next(){
      var args = [].slice.call(arguments);
      allArgs = allArgs.concat(args);
      // 判断是否执行计算
      if(allArgs.length >= fn.length){
        return fn.apply(null, allArgs); // 符合执行条件，执行计算
      }else{
          // 收集传入的参数，进行缓存
          return next;
      }
  } 
}
const sum = (a, b, c) => a + b + c;
const currySum = currying(sum);
console.log(currySum(1)(2)(7))
