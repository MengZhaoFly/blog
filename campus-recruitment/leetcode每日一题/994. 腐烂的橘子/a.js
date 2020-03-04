/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]],
    m = grid.length, n = grid[0].length, time = 0,
    result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 2) result.push({ x: i, y: j })
    }
  }
  while (result.length) {
    let { x, y } = result.shift();
    for (direction of directions) {
      let x_new = x + direction[0], y_new = y + direction[1];
      if (0 <= x_new && x_new < m && 0 <= y_new && y_new < n && grid[x_new][y_new] == 1) {
        grid[x_new][y_new] = 2
        result.push({ x: x_new, y: y_new })
      }
    }
  }

  for (row of grid) {
    if (row.includes(1)) return -1
  }
  return time;
};
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))