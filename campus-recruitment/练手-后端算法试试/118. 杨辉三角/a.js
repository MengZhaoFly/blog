/**
 * @param {number} numRows
 * @return {number[][]}
 */
 var generate = function (numRows) {
  let res = new Array(numRows).fill(null)
  for (let i = 0; i < numRows; i ++) {
    if (res[i] === null) res[i] = [];
    for (let j = 0; j <= i; j ++) {
      if (j === 0 || j === i) {
        res[i][j] = 1
      } else {
        res[i][j] = res[i - 1][j - 1] + res[i - 1][j]
      }
    }
  }
  return res;
};