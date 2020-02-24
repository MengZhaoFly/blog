/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  let dp = new Array(n).fill(null);
  for (let x = 0; x < n; x ++) {
    if (dp[x] === null) dp[x] = []
    for (let y = 0; y < m; y ++) {
      // init
      if (x === 0 || y === 0) dp[x][y] = 1
      else dp[x][y] = dp[x - 1][y] + dp[x][y - 1];
    }
  }
  console.log(dp)
  return dp[n - 1][m - 1]

};
console.log(uniquePaths(3, 2))