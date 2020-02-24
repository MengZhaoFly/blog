/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let yLen = grid.length;
  let dp = new Array(yLen).fill(null);
  let xLen = grid[0].length;
  dp[yLen - 1] = [];
  dp[yLen - 1][xLen - 1] = grid[yLen - 1][xLen - 1];
  for (y = yLen - 1; y >= 0; y--) {
    if (dp[y] === null) dp[y] = [];
    for (x = xLen - 1; x >= 0; x--) {
      if (y === yLen - 1) {
        if (dp[y][x] === undefined) dp[y][x] = dp[y][x + 1] + grid[y][x];
      } else if (x === xLen - 1) {
        if (dp[y][x] === undefined) dp[y][x] = dp[y + 1][x] + grid[y][x];
      } else {
        dp[y][x] = Math.min(dp[y][x + 1], dp[y + 1][x]) + grid[y][x];
      }
    }
  }
  return dp[0][0];
};