/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function(n, m) {
  let arr = new Array(n).fill(null).map((_, i) => i);
  let start = 0;
  while(arr.length > 1) {
    start = (start + m - 1) % arr.length;
    arr.splice(start, 1)
  }
  return arr[0];
};