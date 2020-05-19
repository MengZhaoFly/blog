// 第五版
function debounce(func, wait, immediate) {

  var timeout, result;

  return function () {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        result = func.apply(context, args)
        immediate = false;
      } else {
        console.log(2);
          timeout = setTimeout(function(){
              result = func.apply(context, args)
          }, wait);
      }

      return result;
  }
}