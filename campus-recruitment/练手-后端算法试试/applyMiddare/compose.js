// koa（递归） redux（compose）  组合

const add1 = (x) => x + 1;
const sub20 = (x) => x - 20;
const mul10 = (a, b) => a * b * 10;
// 继承  OOP class
// FP compose
// 
const res = mul10(sub20(add1()))
// 
const compose = (...args) => args.reduceRight((fna, fnb) => (...params) => {
  return fnb(fna(params));
})

const fn = compose(add1, sub20, mul10)
console.log(fn(1, 1))


