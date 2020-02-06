[字节跳动-效率工程 一二三面面筋 + 前端笔记分享](https://www.nowcoder.com/discuss/337035)

1. html

1.html

2. 类数组

[...]
slice(0)
Array.from()

3. 类型转换

```js
if ([] == false) {console.log(1);};
if ({} == false ) {console.log(2);};
if ([]) {console.log(3);};
if ([1] == [1]) {console.log(4);};
```
[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

4. event-loop

```js

async function async1() {
console.log('async1 start');
await async2();
console.log('async1 end');
}
async function async2() {
console.log('async2');
}
console.log('script start');
setTimeout(function () {
console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
console.log('promise1');
resolve();
}).then(function () {
console.log('promise2');
});
console.log('script end');
```