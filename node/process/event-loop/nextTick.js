// chrome.exe  静态 c:/desktop/
let a = 1, b = 2;
let c = a + b;
// 指令： +
// 数据：1 2
// .js .py 字符串 

setImmediate(() => {
  console.log('timeout1')  // 1
  Promise.resolve().then(() => console.log('promise resolve'))  // 3
  process.nextTick(() => console.log('next tick1'))             // 2
  // 执行 一个 task， 在执行 当前 task 产生的 所有 Microtask（Promise.then / nextTick）
  // 注意：nextTick 优先于其他 Microtask 先执行。
});
setImmediate(() => {
  console.log('timeout2')      // 4
  process.nextTick(() => console.log('next tick2'))    // 5
});
setImmediate(() => console.log('timeout3'));    // 6
setImmediate(() => console.log('timeout4'));    // 7
// 


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