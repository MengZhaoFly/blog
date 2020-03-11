
// timer  回调到期
setTimeout(() => {
  console.log(0);
});

// check
for (let i = 0; i < 100000; i ++) {
  // 耗费时间
}
// setTimeout 到期  执行
// check
setImmediate(() => {
  console.log(1)
})


// 无法保证
// 看 setTimeout 何时到期，到期了 才能 setTimeout -》 setImmediate