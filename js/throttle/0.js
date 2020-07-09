// 第二版
function throttle(func, wait) {
  var timeout;

  return function() {
      context = this;
      args = arguments;
      if (!timeout) {
          timeout = setTimeout(function(){
              timeout = null;
              func.apply(context, args)
          }, wait)
      }

  }
}