
// 假如 export 未提升，
// 这个时候 引入 b.js 
// b.js 引入 a.js 的所有内容，是引入不了任何东西的
import { foo } from './b.js';
console.log('a.js');

export const bar = 1;
export const bar2 = () => {
  console.log('bar2');
}
export function bar3() {
  console.log('bar3');
}