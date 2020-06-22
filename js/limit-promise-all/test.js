const p = Promise.resolve(1).then(res => {
  console.log('res');
})
const e = p.then(() => {
  console.log(e);
  console.log(e === a2);
})
var a2 = e
console.log(e === a2);
let a = setTimeout(() => {
  a = 6
}, 2000);
setTimeout(() => {
  console.log(a)
}, 3000);
