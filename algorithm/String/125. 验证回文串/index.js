/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  if (!s) return true;
  let i = 0, j = s.length - 1;
  while( i < j) {
    while(!/[0-9a-zA-Z]/g.test(s[i]) && i < j) i ++;
    while(!/[0-9a-zA-Z]/g.test(s[j]) && i < j) j --;
    if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i ++;
    j --;
  }
  return true;
};
console.log(isPalindrome('A man, a plan, a canal: Panama'));