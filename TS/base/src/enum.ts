enum Direction1 {
  Up,
  Down,
  Left,
  Right
}
enum Direction1 {
  a = 0
}
let ea: Direction1
enum Animal {
  Dog,
  Cat
}
ea = Direction1.Up // ok
ea = Direction1.a
ea = 123
// ea = Animal.Cat  // 不能将类型“Animal.Dog”分配给类型“Direction”

enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
function isSummer(month: Month) {
  switch (month) {
    case Month.June:
    case Month.July:
    case Month.August:
      return true;
    default:
      return false
  }
}
namespace Month {
  export function isSummer(month: Month) {
      switch (month) {
          case Month.June:
          case Month.July:
          case Month.August:
              return true;
          default:
              return false
      }
  }
}
console.log(isSummer(Month.July))


console.log(Month)

namespace Person {
  let a: number = 123
  export function getA(): number {
    return a;
  }
}
console.log('Person', Person, Person.getA());