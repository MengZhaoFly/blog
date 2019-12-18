function foo(a: number): number {
  // return a / 10;
  return 123;

}
foo(123)
let value: object;
value = {}

let val1: unknown
val1 = 123
val1 = 456
val1 = '789'
// console.log(val1.a); // error
let empty: number[] = []
empty = [1, 2, 3]
empty.push(456);


enum Person {
  hand,
  foot
}
const enum Direction {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}
const a = Direction.Up;
console.log(Direction.Right)