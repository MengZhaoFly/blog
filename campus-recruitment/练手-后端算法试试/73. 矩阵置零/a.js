

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let n = matrix.length;
  let m = matrix[0].length,
    row = new Set(),
    col = new Set();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == 0) {
        row.add(i);
        col.add(j);
      }
    }
  }
  for (let i of row.values()) {
    for (let pos = 0; pos < matrix[i].length; pos ++) {
      matrix[i][pos] = 0;
    }
  }
  for (let j of col.values()) {
    for (let pos = 0; pos < matrix.length; pos ++) {
      matrix[pos][j] = 0;
    }
  }
  return matrix;
};
setZeroes([
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
])
