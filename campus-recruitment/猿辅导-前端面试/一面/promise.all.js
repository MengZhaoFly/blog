Promise.all1 = function (promises) {
  let results = [];
  return new Promise(function (resolve, reject) {
    promises.forEach(promise => {
      promise.then(res => {
        results.push(res);
        if (results.length === promises.length) {
          resolve(results);
        }
      });
    });
  });
}
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 2000);
})
Promise.all1([p1, p2, p3])
.then(console.log);
