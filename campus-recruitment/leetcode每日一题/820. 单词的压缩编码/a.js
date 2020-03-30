/**
 * @param {string[]} words
 * @return {number}
 */
 var minimumLengthEncoding = function(words) {
  words = words.sort((a, b) => a.length - b.length);
  let subStrs = [];
  for (let str of words) {
    if (!subStrs.includes(`${str}#`)) {
      subStrs.push(`${str}#`);
    }
  }
  return subStrs.length;
};