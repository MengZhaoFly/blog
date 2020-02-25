/**
 * dp[i] 表示：0 ～ i 这个 子字符串，能不能拆分成功
 */
var wordBreak = function(s, wordDict) {
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true
  for (let i = 0; i < dp.length; i ++) {
    // 0 ～ i 这个 子字符串，能不能拆分成功 ???
    // 继续拆分 [0 ~ j, j ~ i]
    for (let j = 0; j < i; j ++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
      }
    }
  }
  return dp[dp.length - 1]
};
console.log(wordBreak('leetcode', ["leet", "code"]))
console.log(wordBreak("applepenapple", ["apple", "pen"]))
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]))
console.log(wordBreak("cars", ["car","ca","rs"]))