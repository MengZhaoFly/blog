// 一个Promise调用链要么成功到达最后一个.then()，要么失败触发.catch()。
// 在某些情况下，你想要在无论Promise运行成功还是失败，运行相同的代码
// 例如清除 loading
let promise = Promise.resolve(2);
let state = {
  isLoading: true
}
promise.then(res => {
  state.isLoading = false;
})
.finally(() => {
  state.isLoading = false;
})