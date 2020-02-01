interface Person1 {
    name: string;
    age: number;
}
declare const demo1: number[];
declare const demo2: string[];
declare const demo3: Person1[];
interface Array<T> {
    map<U>(cb: (v: T, i: number, array: T[]) => U): U[];
}
declare function indentify(p: number): number;
declare function indentify1<T>(p: T): T;
declare function getLen<T>(arr: Array<T>): void;
interface ReturnFn<T> {
    (p: T): T;
}
interface Exa {
    foo: () => {};
}
declare class Stack<T> {
    private arr;
    push(i: T): void;
    pop(): T | undefined;
}
declare var s: Stack<number>;
declare type stackType = number | string;
declare class Stack1<T extends stackType> {
}
declare function getVal<T extends object, U extends keyof T>(obj: T, k: U): T[U];
declare const ppp: {
    name: string;
};
interface FirstInterface {
    doSomething(): number;
}
interface SecondInterface {
    doSomethingElse(): string;
}
interface ChildInterface extends FirstInterface, SecondInterface {
}
declare class Demo<T extends ChildInterface> {
    private gen;
    constructor(a: T);
    useT(): void;
}
declare const demo: Demo<{
    doSomething: () => number;
    doSomethingElse: () => string;
}>;
declare function factory<T>(type: {
    new (): T;
}): T;
declare function create<T>(c: {
    new (): T;
}): T;
declare class Foooo {
    bar: number;
}
interface Result<T> {
    success: true;
    code: number;
    descript: string;
    result: T;
}
