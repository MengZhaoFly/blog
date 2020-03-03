/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  let s_size = s.size(), t_size = t.size();
  let dp = new Arra(t_size + 1).fill(null);
  for (let i = 0; i < t_size; ++i) {
    if (dp[i] === null) dp[i] = [];
    for (let j = 0; j < s_size; ++j) {
      if (i === 0 && dp[i][j] === undefined) dp[i][j] = 1;
      // else if (i > 1)
      else if (t[i] == s[j]) dp[i + 1][j + 1] = dp[i + 1][j] + dp[i][j];
      else dp[i + 1][j + 1] = dp[i + 1][j];
    }
  }
  return dp[t_size][s_size];
};