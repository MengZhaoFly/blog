// 第一版
function throttle(func, wait) {
  var context, args;
  var previous = 0;

  return function() {
      var now = +new Date();
      context = this;
      args = arguments;
      if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
      }
  }
}