

setTimeout(() => {
  console.log(0);
});
setImmediate(() => {
  console.log(1)
})
// 无法保证
// 看 setTimeout 何时到期，到期了 才能 setTimeout -》 setImmediate