function add(a, b) {
  if (a < 0) {
    return Math.abs(a) + b;
  }
  return a + b;
}
function minus(a, b) {
  return a - b
}
function fetchData(cb) {
  setTimeout(() => {
    cb({code: 200})
  }, 1000);
}
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({code: 304})
    }, 3000);
  })
}
export {
  add,
  minus,
  fetchData,
  fetchDataPromise
}