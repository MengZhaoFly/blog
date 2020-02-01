"use strict";
var demo1 = [1, 2, 3];
var demo2 = ['a', 'b', 'c'];
var demo3 = [{ name: 'n1', age: 18 }];
demo1.map(function (item) {
    console.log(item);
});
function indentify(p) {
    return p;
}
function indentify1(p) {
    return p;
}
function getLen(arr) {
    console.log(arr.length);
}
var Stack = (function () {
    function Stack() {
        this.arr = [];
    }
    Stack.prototype.push = function (i) {
        this.arr.push(i);
    };
    Stack.prototype.pop = function () {
        return this.arr.pop();
    };
    return Stack;
}());
var s = new Stack();
s.push(123);
var Stack1 = (function () {
    function Stack1() {
    }
    return Stack1;
}());
function getVal(obj, k) {
    return obj[k];
}
var ppp = {
    name: '123'
};
getVal(ppp, 'name');
var Demo = (function () {
    function Demo(a) {
        this.gen = a;
    }
    Demo.prototype.useT = function () {
        console.log(123);
        this.gen.doSomething();
        this.gen.doSomethingElse();
    };
    return Demo;
}());
var demo = new Demo({
    doSomething: function () { return 1; },
    doSomethingElse: function () { return '1'; }
});
demo.useT();
function factory(type) {
    return new type();
}
function create(c) {
    return new c();
}
var Foooo = (function () {
    function Foooo() {
        this.bar = 123;
    }
    return Foooo;
}());
console.log(create(Foooo));
//# sourceMappingURL=泛型.js.map