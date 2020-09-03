
const mid1 = next => action => {
  console.log('mid1', action);
  console.log(1);
  next(action)
  console.log(2);
}
// mid1(mid2())
// 需要 next 
// 指向下一项 mid2
// 组合 从右到左 组合完之后 把 mid2 交给 mid1
const mid2 = next => action => {
  console.log('mid2', action);
  console.log(3);
  next(action)
  console.log(4);
}
const mids = [mid1, mid2];
/**
mid1 () {
  console.log(1)
  next === mid2()  // mid2 的返回值
  console.log(2)
}
*/
// compose 组合
let fn1 = str => str.split('');
let fn2 = str => str.toLocaleLowerCase();
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
const opt = compose(fn1, fn2);
// compose === fn1(fn2('ABCDE'))
console.log(opt('ABCDE'));

const chain = compose(...mids);
/**
redux dispatch
只能 dispatch 一个对象
但是 有了 thunk 能够 dispatch 函数
if (action === function) {
  if (action === promise) {
    // 执行 原始的 dispatch
  }
}
*/
let nbDispatch = chain(() => {
  console.log('我是最原始的 dispatch');
});
nbDispatch('----------');

