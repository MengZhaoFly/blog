function cloneSet(set) {
  let t = new Set();
  set.forEach(v => {
    t.add(clone(v));
  })
  return t;
}
// Map  for
function cloneArray(arr) {
  let t = [];
  arr.forEach(v => {
    t.push(clone(v))
  })
  return t;
}
function cloneReg(targe) {
  //{}
  const result = new RegExp(targe.source);
  result.lastIndex = targe.lastIndex;
  return result;
}
function cloneObj(obj) {
  let t = {};
  Object.keys(obj).forEach(k => {
    t[k] = clone(obj[k]);
  })
  return t
}
function cloneFun(func) {
  const funcString = func.toString();
  let paramReg = /\((.+)\)/;
  let bodyReg = /(?<={)(.|\n)+(?=})/m;
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[1].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';


const needClone = {
  '[object Set]': cloneSet,
  '[object Array]': cloneArray,
  '[object RegExp]': cloneReg,
  '[object Object]': cloneObj,
  '[object Function]': cloneFun
}
const whiteList = ['[object String]', '[object Number]']
function getType(target) {
  return Object.prototype.toString.call(target);
}
function clone(data) {
  let type = getType(data)
  if (whiteList.includes(type)) return data;
  return needClone[type](data)
}

let c = function(a, b) { return a + b }
let data = { obj: { a: 1 }, b: [1], c: /[a-z]/, fun: c}
let data1 = clone(data);
data1.b.push(2);
console.log(data1, data);
console.log(data1.c === data.c);
console.log(data1.fun === data.fun, data1.fun(1,2));