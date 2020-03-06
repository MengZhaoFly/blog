/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  // 上 下 左 右
  let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]],
    m = grid.length, n = grid[0].length, time = -1,
    result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 2) result.push({ x: i, y: j })
    }
  }
  while (result.length) {
    // 上一次病变的 橘子
    let loop = result.splice(0, result.length);
    // 一次病变
    time++;
    for (let { x, y } of loop) {
      // 影响周围的橘子病变
      for (direction of directions) {
        let x_new = x + direction[0], y_new = y + direction[1];
        if (0 <= x_new && x_new < m && 0 <= y_new && y_new < n && grid[x_new][y_new] == 1) {
          grid[x_new][y_new] = 2
          result.push({ x: x_new, y: y_new })
        }
      }
    }
  }

  for (row of grid) {
    if (row.includes(1)) return -1
  }
  return Math.max(0, time);
};
// console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))