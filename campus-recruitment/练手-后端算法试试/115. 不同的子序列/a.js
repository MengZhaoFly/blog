/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  let s_size = s.length, t_size = t.length;
  let dp = new Array(t_size + 1).fill(null);
  for (let i = 0; i < t_size + 1; i ++) {
    if (dp[i] === null) dp[i] = [];
    for (let j = 0; j < s_size + 1; j ++) {
      // console.log(i, j, s[i - 1], s[j - 1])
      if (i === 0 && dp[i][j] === undefined) dp[i][j] = 1;
      // else if (i > 1)
      else if (j === 0 && i >= 1) dp[i][j] = 0;
      else if (t[i - 1] === s[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
      }
      else dp[i][j] = dp[i][j - 1];
    }
  }
  return dp[t_size][s_size];
};
// numDistinct('bbb', 'bb')
// numDistinct("rabbbit", "rabbit")