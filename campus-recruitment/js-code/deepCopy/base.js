function cloneDeep(obj) {
  let t = {};
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object') {
      t[k] = cloneDeep(obj[k])
    } else {
      t[k] = obj[k];
    }
  })
  return t
}