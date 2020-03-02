var calculate = function (s) {
  let polish = getPolish(s);
  return evalRPN(polish);
}
var evalRPN = function (tokens) {
  let stack = [];
  for (let t of tokens) {
    switch (t) {
      case '+':
        let num1 = stack.pop(), num2 = stack.pop();
        stack.push(num1 + num2)
        break;
      case '-':
        let n1 = stack.pop(), n2 = stack.pop();
        stack.push(n2 - n1)
        break;
      case '*':
        let a = stack.pop(), b = stack.pop();
        stack.push(a * b)
        break;
      case '/':
        let c = stack.pop(), d = stack.pop();
        stack.push(parseInt((d / c)))
        break;
      default:
        stack.push(parseInt(t, 10));
        break;
    }
  }
  return stack.pop();
};
function getPolish(s) {
  let res = [];
  let stack = [];
  let len = s.length;
  const SECIALCHAR = ['+', '-', '(', ')']
  const OPT = ['+', '-']
  for (let i = 0; i < len; i++) {
    if (s[i] == ' ') {
      continue;
    }
    let num = '';
    while (s[i] !== ' ' && !SECIALCHAR.includes(s[i]) && i < len) {
      // console.log(9999999999);
      num += s[i]
      i++;
    }
    num && res.push(num);
    if (OPT.includes(s[i])) {
      //遇到操作符将栈中的操作符加入到结果中
      while (stack.length !== 0) {
        //遇到左括号结束
        if (stack[stack.length - 1] === '(') {
          break;
        }
        res.push(stack.pop());
      }
      //当前操作符入栈
      stack.push(s[i]);
    } else {
      //遇到左括号，直接入栈
      if (s[i] == '(') {
        stack.push(s[i]);
      }
      //遇到右括号，将出栈元素加入到结果中，直到遇到左括号
      if (s[i] == ')') {
        while (stack[stack.length - 1] !== '(') {
          res.push(stack.pop());
        }
        //左括号出栈
        stack.pop();
      }

    }
  }
  //栈中的其他元素加入到结果
  while (stack.length !== 0) {
    res.push(stack.pop());
  }
  return res;
}