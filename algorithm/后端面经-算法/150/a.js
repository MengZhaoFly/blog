var evalRPN = function (tokens) {
  let stack = [];
  for (let t of tokens) {
    switch (t) {
      case '+':
        let a = stack.pop(), b = stack.pop();
        stack.push(a + b);
        break;
      case '-':
        let c = stack.pop(), d = stack.pop();
        stack.push(d - c);
        break;
      case '*':
        let e = stack.pop(), f = stack.pop();
        stack.push(e * f);
        break;
      case '/':
        let g = stack.pop(), h = stack.pop();
        stack.push(parseInt(h / g));
        break;
      default:
        stack.push(parseInt(t))
        break;
    }
  }
  return stack.pop();
}