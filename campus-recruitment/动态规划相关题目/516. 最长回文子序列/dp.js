/**
 * @param {string} s
 * @return {number}
 * dp[i][j]：在子串 s[i..j] 中，最长回文子序列的长度
 * 假设你知道了子问题 dp[i+1][j-1] 的结果（s[i+1..j-1] 中最长回文子序列的长度），
 * 你是否能想办法算出 dp[i][j] 的值（s[i..j] 中，最长回文子序列的长度）呢？
 * 可以！这取决于 s[i] 和 s[j] 的字符：
如果它俩相等，那么它俩加上 s[i+1..j-1] 中的最长回文子序列就是 s[i..j] 的最长回文子序列
不想等，则把s[i]放左端点 s[j] 右断点
 */
var longestPalindromeSubseq = function (s) {
  let n = s.length;
  let dp = new Array(n).fill(null)
  // base case
  // dp 数组全部初始化为 0
  // 斜对角初始化为 1
  for (let i = 0; i < n; i++) {
    if (dp[i] === null) dp[i] = new Array(n).fill(0)
    dp[i][i] = 1;
  }
  // 反着遍历保证正确的状态转移
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      // 状态转移方程
      if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  // 整个 s 的最长回文子串长度
  return dp[0][n - 1];
};

console.log(longestPalindromeSubseq('bbbab'))