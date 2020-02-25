/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  let exist = wordDict.find(word => s.includes(word));
  while (exist) {
    s = s.replace(exist, '');
    exist = wordDict.find(word => s.includes(word));
  }
  return s.length === 0;
};
console.log(wordBreak('leetcode', ["leet", "code"]))
console.log(wordBreak("applepenapple", ["apple", "pen"]))
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]))