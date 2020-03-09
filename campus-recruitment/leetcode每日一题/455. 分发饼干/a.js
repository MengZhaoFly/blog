/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g = g.sort((a, b) => a - b);   // i
  s = s.sort((a, b) => a - b);   // j
  let i = 0, j = 0;
  let res = 0;
  while(i < g.length && j < s.length) {
    
    if (s[j] >= g[i]) {
      res ++;
      i ++;
      j ++;
    }
    else {
      j ++;
    }

  }
  return res;
};
// console.log(findContentChildren([10,9,8,7], [5,6,7,8]))
// [7,8,9,10]
// [5,6,7,8]