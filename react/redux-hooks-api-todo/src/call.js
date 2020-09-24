// obj.XXXXX
// call/apply bind
// new 

let obj = {
  a: 1,
  foo: foo  
}
function foo() {
  console.log(this)
}
foo();  
// foo.call(obj); // obj
// obj.foo()   // obj
Function.prototype.call = function(obj) {
  // 
  let fn = this; 
  obj.xxx = fn;
  obj.xxx();
  delete obj.xxx;
}