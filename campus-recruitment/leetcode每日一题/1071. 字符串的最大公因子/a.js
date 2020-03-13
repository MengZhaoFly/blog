/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
  let minLen = Math.min(str1.length, str2.length);
  let format = str1.length < str2.length ? str1 : str2;
  let str = '';
  for (let i = 1; i <= minLen; i ++) {
    let set1 = new Set(), set2 = new Set();
    for (let j = 0; j < str1.length; j += i) {
      let start = j, end = start + i;
      // console.log(start, end, str1.substring(start, end))
      set1.add(str1.substring(start, end))
    }
    for (let k = 0; k < str2.length; k += i) {
      let start = k, end = start + i;
      set2.add(str2.substring(start, end))
    }
    // if (format === str2) {
    //   set1.add(str1.substring(minLen, str1.length))
    // } else {
    //   set2.add(str2.substring(minLen, str2.length))
    // }
    let arr1 = [...set1.values()], arr2 = [...set2.values()]
    if (arr1.length === 1 && arr2.length === 1 && arr2[0] === arr1[0]) {
      // console.log(i, arr1, arr2, arr1[0].length > str)
      str = arr1[0].length > str.length ? arr1[0] : str;
    }
  }
  return str;
};
// console.log(gcdOfStrings("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
// "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))