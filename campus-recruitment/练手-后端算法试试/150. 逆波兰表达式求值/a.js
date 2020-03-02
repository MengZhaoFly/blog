/**
 * @param {string[]} tokens
 * @return {number}
 */
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
evalRPN(["2", "1", "+", "3", "*"])
evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
