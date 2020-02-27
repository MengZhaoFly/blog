

var minPathSum = function (grid) {
  let yLen = grid.length;
  let xLen = grid[0].length;
  let dp = new Array(yLen).fill(null);
  dp[yLen - 1] = [];
  // base case 初始化
  dp[yLen - 1][xLen - 1] = grid[yLen - 1][xLen - 1];
  for (let y = yLen - 1; y >= 0; y --) {
    if (dp[y] === null) dp[y] = [];
    for (let x = xLen - 1; x >= 0; x --) {
      if (y === yLen - 1) {
        if (dp[y][x] === undefined) dp[y][x] = dp[y][x + 1] + grid[y][x]
      } else if (x === xLen - 1) {
        if (dp[y][x] === undefined) dp[y][x] = dp[y + 1][x] + grid[y][x]
      } else {
        dp[y][x] = Math.min(dp[y][x + 1], dp[y + 1][x]) + grid[y][x]
      }
    }
  }
  console.log(dp);
  // dp[x][y]: 从左上角 到 (x, y)这个位置的路径总和最小
  return dp[0][0];
}
console.log(minPathSum([
  [1,3,1],
  [1,5,1],
  [4,2,1]
]))