var uniquePaths = function(m, n) {
  // 从 0，0 从下往上，n - 1, m-1 推导出结果
  // dp = [[], []]
  // dp m x n 矩阵，存储到达【x, y】路径总数
  let dp = new Array(n).fill(null);
  for (let x = 0; x < n; x ++) {
    if (dp[x] === null) dp[x] = []
    for (let y = 0; y < m; y ++) {
      if (x === 0 || y === 0) {
        dp[x][y] = 1;
      } else {
        dp[x][y] = dp[x][y - 1] + dp[x- 1][y];
      }
    }
  }
  return dp[n - 1][m -1]
}