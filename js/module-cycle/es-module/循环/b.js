import { foo } from './a.js';
export function bar() {
  console.log(1)
  if (Math.random() > 0.5) {
    foo()
  }
}