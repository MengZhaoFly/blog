/**
applepenapple   ["apple", "pen"]
i：0 ~ len 
dp[i]: 从 0 ～ i 子字符串能不能被组合成功 ？？？
[false, false, false, f, t, f, f, t(apple / pen), (applepena), (applepenap), applepenapple]

判断  0 ～ i 子字符串能不能被组合成功：
apple / pen: 不知道在哪个位置切开，每个位置（0 ～ i）
j:  0 ~ i
a / pplepen: f
ap / plepen: f
... 
apple / pen: t  只要找到一个位置，能够满足 0 ~ j  && j ~ i 子子字符串能够组合 =》t

applepen  /   apple : 0 ~ j && j ~ i   =>  t
''applepenapple
 */
var wordBreak = function(s, wordDict) {
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 0; i < dp.length; i ++) {
    // 从 0 ～ i 子字符串能不能被组合成功 ？？？
    for (let j = 0; j < i; j ++) {
      // 子子字符串
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
      }
    }
  }
  return dp[dp.length  - 1];
}
console.log(wordBreak("leetcode",  ["leet", "code"]))
console.log(wordBreak("catsandog",   ["cats", "dog", "sand", "and", "cat"]))
