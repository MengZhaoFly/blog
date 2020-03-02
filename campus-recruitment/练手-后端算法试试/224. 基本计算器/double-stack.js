/**
 * @param {string} s
 * @return {number}
2-1+2
 */
var calculate = function (s) {
  const OPT = ['+', '-']
  const SECIALCHAR = ['+', '-', '(', ')']
  // 数字
  let numStack = [];
  // 操作符
  let optStack = []
  const len = s.length;
  let i = 0;
  for (let i = 0; i < len; i++) {
    if (s[i] === ' ') {
      continue;
    }
    let num = '';
    while (s[i] !== ' ' && !SECIALCHAR.includes(s[i]) && i < len) {
      // console.log(9999999999);
      num += s[i]
      i++;
    }
    num && numStack.push(num);
    // console.log(i, s[i], num, numStack, optStack)
    if (OPT.includes(s[i])) {
      // 遇到操作符，代表着可能进行运算
      // 如遇到第二个 + 则需要运算：2-1+2
      // 如遇到第二个 + 不需要运算 ：(1+(4+5+2)-3)+(6+8)
      // while (optStack.length !== 0 && i < len) {
      // 不需要运算
      if (optStack[optStack.length - 1] !== '(' && optStack.length !== 0) {
        let num1 = numStack.pop(), num2 = numStack.pop();
        let opt = optStack.pop();
        let res = null;
        if (opt === "+") res = parseInt(num1) + parseInt(num2);
        else if (opt === '-') res = parseInt(num2) - parseInt(num1); // 先弹出来的是减数
        numStack.push(res);
      }
      // }
      optStack.push(s[i]);
    } else if (s[i] === '(') {
      optStack.push(s[i]);
    } else if (s[i] === ')') {
      // 遇到右括号的时候
      // 需要运算 每次取两个数 一个运算符
      while (optStack[optStack.length - 1] !== '(' && i < len) {
        // console.log(2222222)
        let num1 = numStack.pop();
        let num2 = numStack.pop();
        let res = null, opt = optStack.pop();
        // console.log(num1, num2)
        if (opt === "+") res = parseInt(num1) + parseInt(num2);
        else if (opt === '-') res = parseInt(num2) - parseInt(num1); // 先弹出来的是减数
        numStack.push(res);
      }
      // 左括号：） 弹出
      optStack.pop();
    }
  }
  console.log(numStack, optStack)
  // 最后还有未计算完的数据
  while (optStack.length) {
    let num1 = numStack.pop();
    let num2 = numStack.pop();
    if (optStack.pop() == '+') {
      numStack.push(parseInt(num1) + parseInt(num2));
    } else {
      numStack.push(parseInt(num2) - parseInt(num1));
    }
  }
  // console.log(numStack, optStack)
  // if (OPT.includes(optStack[optStack.length - 1])) {}
  return numStack.pop()

};
// calculate("(1+(4+5+2)-3)+(6+8)")  // 19 0 ~ 18
// calculate(" 10-1 + 2 ")
// calculate('1 + 1')