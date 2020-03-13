let a = {tt: 11}
a.t = a;
function cloneDeep(obj, map = new Map()) {
  let t = {};
  if (map.get(obj)) {
    return map.get(obj);
  }
  map.set(obj, t);
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object') {
      t[k] = cloneDeep(obj[k], map);
    } else {
      t[k] = obj[k];
    }
  })
  return t;
}
console.log(cloneDeep(a));