var calculate = function (s) {
  let numStack = [];
  let optStack = [];
  let len = s.length;
  const SEPCIALCHAR = ['+', '-', '(', ')']
  const OPT = ['+', '-']
  for (let i = 0; i < len; i++) {
    if (s[i] === ' ') continue;
    // 遇到数字   2-1 + 222 
    let num = ''
    while (!SEPCIALCHAR.includes(s[i]) && s[i] !== ' ' && i < len) {
      num += s[i];
      i++;
    }
    num && numStack.push(num);
    if (OPT.includes(s[i])) {
      if (optStack.length !== 0 && optStack[optStack.length - 1] !== '(') {
        // 前面存在表达式 比如存在  2-1 当我遍历到 + 需要把前面运算出来
        let num1 = numStack.pop(), num2 = numStack.pop();
        let res = null;
        if (optStack.pop() === '+') {
          res = parseInt(num1) + parseInt(num2)
        } else {
          res = parseInt(num2) - parseInt(num1) // ???
        }
        numStack.push(res)
      }
      optStack.push(s[i])
    } else if (s[i] === '(') {
      optStack.push(s[i]);
    } else if (s[i] === ')') {
      // 把【需要的表达式】运算完 ：即 （ 后面的那一部分
      // 持续到 遇到 （ 为止
      while (optStack[optStack.length - 1] !== '(' && i < len) {
        let num1 = numStack.pop(), num2 = numStack.pop();
        let res = null;
        if (optStack.pop() === '+') {
          res = parseInt(num1) + parseInt(num2)
        } else {
          res = parseInt(num2) - parseInt(num1) // ???
        }
        numStack.push(res)
      }
      // 栈顶的 （ 需要 pop 掉
      optStack.pop();
    }
  }
  while (optStack.length !== 0) {
    let num1 = numStack.pop(), num2 = numStack.pop();
    let res = null;
    if (optStack.pop() === '+') {
      res = parseInt(num1) + parseInt(num2)
    } else {
      res = parseInt(num2) - parseInt(num1) // ???
    }
    numStack.push(res)
  }
  // console.log(numStack, optStack)
  return numStack.pop();
}
// calculate(" 2-1 + 2 ");
// calculate("1 + 1");
// calculate("(1+(4+5+2)-3)+(6+8)")
// numStack: [1, 4, 5]
// optStack: ['(', '+', '(', '+', '+']