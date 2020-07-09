// 就是鼠标移入能立刻执行，停止触发的时候还能再执行一次
function throttle(func, wait) {
  var timeout, context, args, result;
  var previous = 0;

  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args)
  };

  var throttled = function () {
    var now = +new Date();
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    // console.log(remaining, timeout);
    if (remaining <= 0) {
      // setTimeout 的 机制
      // 并不会准确地在 remaining 这个点就立即执行
      // 因为定时器并不是准确的时间，很可能你设置了2秒，但是他需要2.2秒才触发
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}