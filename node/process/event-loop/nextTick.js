setImmediate(() => {
  console.log('timeout1')
  Promise.resolve().then(() => console.log('promise resolve'))
  process.nextTick(() => console.log('next tick1'))
});
setImmediate(() => {
  console.log('timeout2')
  process.nextTick(() => console.log('next tick2'))
});
setImmediate(() => console.log('timeout3'));
setImmediate(() => console.log('timeout4'));
/**
node v11 之前：上述代码是先进入 check 阶段，执行所有 setImmediate
timeout1
timeout2
timeout3
timeout4
next tick1
next tick2
promise resolve
-------------------------------------
v12.16.1：执行一个 setImmediate 宏任务，然后执行其微任务队列，再执行下一个宏任务及其微任务
timeout1
next tick1
promise resolve
timeout2
next tick2
timeout3
timeout4
*/