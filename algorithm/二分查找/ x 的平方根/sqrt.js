 /**
   * @param {number} x
   * @return {number}
   */
  var mySqrt = function (x) {
    if (x < 2) return x;
    let start = 0, end = x - 1;
    // 0 1 2
    while (start <= end) {
      let mid = Math.floor((end - start) / 2) + start;
      if (mid * mid > x) {
        end = mid - 1;
      } else if (mid * mid < x) {
        start = mid + 1;
      } else if (mid * mid === x) {
        return mid;
      }
    }
    // 求整数
    return end;
  };
  console.log(mySqrt(3))