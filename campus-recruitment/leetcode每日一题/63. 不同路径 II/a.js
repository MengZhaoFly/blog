/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
 var uniquePathsWithObstacles = function(obstacleGrid) {
  let n = obstacleGrid.length, m = obstacleGrid[0].length;
  let dp = new Array(n).fill(null);
  for (let x = 0; x < n; x ++) {
    if (dp[x] === null) dp[x] = [];
    for (let y = 0; y < m; y ++) {
      if(obstacleGrid[x][y] === 1) {
        dp[x][y] = 0;
        continue;
      }
      if (x === 0 && y === 0) dp[x][y] = obstacleGrid[x][y] === 1 ? 0 : 1;
      else if (x >= 1 && y === 0) dp[x][y] = dp[x - 1][y] === 0 ? 0 : dp[x - 1][y]
      else if (x === 0 && y >= 1) dp[x][y] = dp[x][y - 1] === 0 ? 0 : dp[x][y - 1]
      else dp[x][y] = dp[x - 1][y] + dp[x][y - 1];
    }
  }
  console.log(dp);
  return dp[n - 1][m - 1];
};
console.log(uniquePathsWithObstacles([
  [0,0,0],
  [0,1,0],
  [0,0,0]
]))