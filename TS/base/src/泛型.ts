interface Person1 {
  name: string,
  age: number
}
const demo1: number[] = [1,2,3];
const demo2: string[] = ['a', 'b', 'c'];
const demo3: Person1[] = [{name: 'n1', age: 18}]

demo1.map((item: number) => {
  console.log(item)
});

interface Array<T> {
  map<U>(cb: (v: T, i: number, array: T[]) => U): U[]
}

function indentify(p: number): number {
  return p;
}
function indentify1<T>(p: T): T {
  return p;
}
indentify1(1)
function getLen<T>(arr: Array<T>) {
  console.log(arr.length);
}

interface ReturnFn<T> {
  (p: T): T
}
interface Exa {
  foo: () => {}
}

class Stack<T> {
  private arr: T[] = [];
  public push(i: T) {
    this.arr.push(i);
  }
  public pop() {
    return this.arr.pop();
  }
}
var s = new Stack<number>();
s.push(123);
// 传入的泛型 属于 number 或者 string
type stackType = number | string;
class Stack1<T extends stackType> {}


// 索引类型
function getVal<T extends object,U extends keyof T>(obj: T, k: U) {
  return obj[k];
}
const ppp = {
  name: '123'
}
getVal(ppp, 'name');

// 多重类型进行泛型约束
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}
// 可以将接口 FirstInterface 与 SecondInterface 作为超接口来解决问题
interface ChildInterface extends FirstInterface, SecondInterface {

}

class Demo<T extends ChildInterface> {
  private gen: T;
  constructor(a: T) {
    this.gen = a;
  }
  useT() {
    console.log(123);
    this.gen.doSomething();
    this.gen.doSomethingElse();
  }
}
const demo = new Demo({
  doSomething: () => 1,
  doSomethingElse: () => '1'
});
demo.useT();

function factory<T>(type: {new() : T}): T {
  return new type();
}
function create<T>(c: {new(): T; }): T {
  return new c();
}
class Foooo{
  public bar: number = 123
}
console.log(create(Foooo));

// function Bar() {
//   this.abc = 123;
// }

// 描述数据返回结果
interface Result<T> {
  success: true,
  code: number,
  descript: string,
  result: T
}
// 返回结果为number
// function fetchData(): Promise<Result<number>> {
//   return http.get('/api/demo/number');
// }
// 返回结果为 json
// interface Person {
//   name: string,
//   age: number
// }

// function fetchData(): Promise<Result<Person>> {
//   return http.get('/api/demo/person');
// }