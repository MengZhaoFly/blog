export default class MyArr<T> extends Array<T>  {
  shiftItems: T[]
  constructor() {
    super();
    this.shiftItems = []
    Object.setPrototypeOf(this, MyArr.prototype)
  }
  public shift() {
    let r = super.shift.call(this);
    this.shiftItems.push(r);
    return r;
  }
  public getPosition():number {
    return this.length
  }
  public setPosition(pos: number) {
    let len = this.length;
    let x = pos - len;
    this.unshift(...this.shiftItems.slice(-x));
    this.shiftItems = [];
  }
}
// let r = new MyArr<number>();
// r.push(1)
// r.push(2)
// r.push(3)
// r.push(4)
// // console.log(MyArr.getPosition)
// let p = r.getPosition();

// console.log(r.shift())
// console.log(r.shift())
// console.log(r.shift())
// console.log(r.shift())
// r.setPosition(p);
// console.log(r);



