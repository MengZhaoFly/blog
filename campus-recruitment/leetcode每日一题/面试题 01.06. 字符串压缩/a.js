/**
 * @param {string} S
 * @return {string}
 * 输入："aabcccccaaa"
  输出："a2b1c5a3"
 */
var compressString = function(S) {
  let str = '';
  for (let i = 0; i < S.length; i ++) {
    let char = S[i], count = 1;
    while (char === S[i + 1]) {
      count ++;
      i ++
    }
    str += `${char}${count}`;
  }
  return str.length < S.length ? str : S;
};
// console.log(compressString('aabcccccaaa'))
// console.log(compressString('abbccd'));