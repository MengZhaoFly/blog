/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  function step(x, y) {
    if (x === 0 || y === 0) return 1;
    return step(x - 1, y) + step(x, y - 1);
  }
  return step(n - 1, m - 1);
}
console.log(uniquePaths(7, 3))