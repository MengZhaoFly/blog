// x 的平方根 ^ 2
// 9 0 ~ 8 
// 3 个区间
// left, 3  
// 4
// 5, right
//【0, 1, 2, 3, 4, 5, 6, 7, 8】
var mySqrt = function (x) {
  if (x < 2) return x;
  let left = 0, right = x - 1;
  // ??? <  <=
  // left == right
  while (left <= right) {
    let mid = Math.floor((right - left) / 2) + left; // ??
    let res = mid * mid;
    console.log(left. mid, right);
    if (res > x) {
      right = mid - 1
    } else if (res < x) {
      left = mid + 1;
    } else if (res === x) {
      // 2 * 2   3 * 3  
      // 1.12121 * 
      return mid;
    }
  }
  return right;
}

console.log(mySqrt(8))
// 1
// L 0  R 2  M: 1
// L 2  R 2  M