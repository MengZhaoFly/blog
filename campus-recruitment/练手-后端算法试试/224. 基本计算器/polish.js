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
console.log(getPolish('((2 + 1 + 5) - 3) + 9'))
// [ '2', '1', '+', '5', '+', '3', '-', '9', '+' ]
/**
 * 1）如果遇到操作数，我们就直接将其加入到后缀表达式。

2）如果遇到左括号，则我们将其放入到栈中。

3）如果遇到一个右括号，则将栈元素弹出，将弹出的操作符加入到后缀表达式直到遇到左括号为止，接着将左括号弹出，但不加入到结果中。
4）如果遇到其他的操作符，如（“+”， “-”）等，从栈中弹出元素将其加入到后缀表达式，直到栈顶的元素优先级比当前的优先级低（或者遇到左括号或者栈为空）为止。弹出完这些元素后，最后将当前遇到的操作符压入到栈中。

5）如果我们读到了输入的末尾，则将栈中所有元素依次弹出。

这里的话注意一下第四条规则，因为题目中只有加法和减法，加法和减法是同优先级的，所以一定不会遇到更低优先级的元素，所以「直到栈顶的元素优先级比当前的优先级低（或者遇到左括号或者栈为空）为止。」这句话可以改成「直到遇到左括号或者栈为空为止」。

 */