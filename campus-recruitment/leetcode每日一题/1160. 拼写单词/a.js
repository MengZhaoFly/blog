/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function(words, chars) {
  let charsMap = {}
  for (let char of chars) {
    if (charsMap[char] === undefined) {
      charsMap[char] = 0;
    }
    charsMap[char] ++;
  }
  let res = 0;
  for (let word of words) {
    let wordMap = {}, len = 0;
    for (let w of word) {
      if (wordMap[w] === undefined) wordMap[w] = 0;
      wordMap[w] ++;
      len ++;
    }
    wordMap.len = len;
    let flag = true;
    // console.log(wordMap, charsMap)
    for (let k of Object.keys(wordMap)) {
      if (k === 'len') continue;
      if (charsMap[k] === undefined || wordMap[k] > charsMap[k]) {
        flag = false;
      }
    }
    if (flag) {
      res += wordMap.len
    }
  }
  return res;
};
// console.log(countCharacters(["hello","world","leetcode"],  "welldonehoneyr"))