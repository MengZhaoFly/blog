/**
 * 但是我有时也希望无头有尾，或者有头无尾，这个咋办？

那我们设置个 options 作为第三个参数，然后根据传的值判断到底哪种效果，我们约定:

leading：false 表示禁用第一次执行
trailing: false 表示禁用停止触发的回调
 */
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    // previous = new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var now = new Date().getTime();
    // 无头： 把previous 设为当前的时间，现在的话 now - previous 并不大于  wait
    // 所以 去掉第一次执行
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      // 把闭包里面的变量 置空，垃圾回收
      if (!timeout) context = args = null;
      
    } else if (!timeout && options.trailing !== false) {
      // 去尾：没必要启动定时器，前面的方法（时间戳）足以。
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}