/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let five = 0;
  while (n >= 5) {
    five += Math.floor(n / 5);
    n /= 5;
  }
  return five;
};
console.log(trailingZeroes(25))