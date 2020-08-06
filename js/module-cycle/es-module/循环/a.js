import {bar} from './b.js';
export function foo() {
  bar();  
  console.log('执行完毕');
}
foo();