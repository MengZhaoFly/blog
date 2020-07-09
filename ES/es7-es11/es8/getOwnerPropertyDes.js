let obj = {}
Object.defineProperty(obj, 'a', {
  value: 1,
  configurable: false,
  enumerable: true,
  writable: true
})
console.log(Object.getOwnPropertyDescriptor(obj, 'a'))