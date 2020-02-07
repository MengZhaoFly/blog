/**
 * 
function repeat(func, times, wait) {
}
const repeatFunc = repeat(alert, 4, 3000)
 */

function repeat(func, times, wait) {
  return (...rest) => {
    for (let i = 0; i < times; i ++) {
      setTimeout(() => {
        func.apply(this, rest);
      }, wait * i);
    }
  }
}
const repeatFunc = repeat(console.log, 4, 3000)
repeatFunc('hellworld')