import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);