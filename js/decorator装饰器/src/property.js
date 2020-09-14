function debounce(func, wait) {
  var timeout, result;

  return function () {
    var context = this;
    var args = arguments;
    // 上一个 定时器 清楚
    // 接着一个 新的定时器 它的时间又会往后推迟
    clearTimeout(timeout)
    // 几秒过后在执行
    timeout = setTimeout(function () {
      result = func.apply(context, args);
    }, wait);
    return result;
  }
}
function decDebounce(wait) {
  return function handleDescriptor(target, key, descriptor) {
    console.log('target', target, descriptor)
    // const callback = descriptor.value;
    const callback = descriptor.initializer 
    && descriptor.initializer.call(this);
    if (typeof callback !== 'function') {
      throw new SyntaxError('Only functions can be debounced');
    }

    var fn = debounce(callback, wait);
    // console.log(fn);
    // console.log(descriptor);
    // descriptor.value = fn;
    return {
      enumerable: true,
      configurable: true,
      get: function () {
        return fn;
      }
      // set: function (c) {
      //   fn = c;
      // }
    };
  }
}

class Btn {
  @decDebounce(1000)
  handleClick = () => {
    console.log(1);
  }
  bindEvent() {
    document.getElementById('btn')
    .addEventListener('click', this.handleClick)
  }
}
var b = new Btn()
console.log('b', b);
b.bindEvent();