

Promise.resolve().then(function () {
  console.log('promise1');      // 3
  return Promise.resolve(111);
}).then(function (val) {
  console.log(val);          //  5
  console.log('promise1-2');    // 6
  return Promise.resolve(2222);
}).then((res) => {
  console.log(res);
})
Promise.resolve().then(function () {
  console.log(1)
}).then(function () {
  console.log('promise2-2');
}).then(() => {
  console.log(123);
}).then(() => {
  console.log(44444)
})