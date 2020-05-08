interface User {
  name: string,
  age: number,
}
const user: User = {
  name: '123',
  age: 12
}
let n: string = 'name';
user[n];


let myIdentity: <U>(arg: U) => U
myIdentity = function<T> (arg: T): T {
  return arg
}
myIdentity<number>(123);

interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) // OK
  return arg
}
// loggingIdentity<number>(3); 