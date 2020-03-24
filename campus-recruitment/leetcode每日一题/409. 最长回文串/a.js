/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
  let map = {};
  for (let char of s) {
    if (map[char] === undefined) {
      map[char] = 0;
    }
    map[char] ++;
  }
  let res = 0, flag = false;;
  for (let k of Object.keys(map)) {
    // if (map[k] % 2 === 0) {
    //   res += map[k];
    // }
    res += Math.floor(map[k] / 2) * 2;
    // (map[k] % 2 === 1 表示基数
    // 但是 一个回文串 只能存在一个基数
    if (!flag && (map[k] % 2 === 1)) {
      flag = true;
    }
  }
  return flag ? res + 1 : res;
};
// console.log(longestPalindrome('abccccdd'))