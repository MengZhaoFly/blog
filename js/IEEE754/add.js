/**
 * 参考
 * https://github.com/nefe/number-precision/blob/master/src/index.ts
 */

function plus(num1, num2) {
  // const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num1Digits = digitLength(num1);
  // const num2Digits = (num2.toString().split('.')[1] || '').length;
  const num2Digits = digitLength(num2);
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
function digitLength(num) {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
console.log(plus(0.1, 0.2))
console.log(plus(0.1, 2.3e+1))
console.log(plus(0.9999999e+1, 2.3e+1))
console.log(0.2 + 0.1)
