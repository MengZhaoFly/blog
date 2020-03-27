[字节跳动-效率工程 一二三面面筋 + 前端笔记分享](https://www.nowcoder.com/discuss/337035)

1. html

1.html

2. 类数组
```js
function foo() {
  arguments  // 类数组
  1. [...arguments]
  2. Array.prototype.slice(arguments, 0)
  3. Array.from(arguments)
}
```


3. 类型转换

```js
[]
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



```js
两个数
三个数

[1, 2, 3, 4, 5, 6] 3 15 
```
解答该算法题：回溯法
从很多个选项里面找到 满足条件的

很多个选项：可以用树来表示


## 二面
1. 输出
```JS
var a =  function () {
this.b = 3;
}
var c = new a();
var b = 7;
a();
console.log(b);
console.log(c.b)
```

### extends
1. 原型链继承
   `Child1.prototype = new Parent1();`
   ```js
   function Foo() { this.name = '123' }
   Foo.prototype.say = function() { console.log('say') }
   const p = new Foo();
   p.say()  // say
   ```
2. 原型式继承
   ```js
   function create(obj) {
      var F = function() {}
      F.prototype = obj;
      return new F();
    }
    Child1.prototype = create(Parent1.prototype);
    // Object.create()
    ```
3. 寄生组合继承  extends
   ```js
   // 属性
    function Child1() {
      Parent1.call(this);
    }
    function create(obj) {
      var F = function() {}
      F.prototype = obj;
      return new F();
    }
    // 继承方法
    Child1.prototype = create(Parent1.prototype);
    Child1.prototype.constructor = Child1;
    ```

4. 数组
   排序：略
   数组长度： <  2 ^ 32 - 1
   两个数组存储：先把数组排序  -> 两个有序的数组合并

### 哈希表
哈希表（Hash table，也叫散列表）
是根据键（Key）而直接访问在内存储存位置的数据结构。
```js
var map = new Map()
```
它通过计算一个关于键值的函数，将所需查询的数据`映射`到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做 `散列函数`，存放记录的数组称做散列表.
哈希表存储的是键值对，其查找的时间复杂度与元素数量多少无关，哈希表在查找元素时是通过计算哈希码值来定位元素的位置从而直接访问元素的，因此，哈希表查找的时间复杂度为O（1）。

但是就像“人无完人”一样，哈希查找也有缺点，会产生冲突，而冲突是无法避免的，我们只能说尽可能的减少冲突来优化哈希表并且要解决冲突。（99%）
学生：
数组：

```js
[ {name: 'tom', age: ''}, {name: 'jack', age: '' } ]
// find  O(n)
```

// 构造出一个 通过 name 可直接取到个人信息的 hash table
1: lies  -> hash function = 9;
2: find 也计算出来 9 直接去 第9格里面取出来   O(1)

### 哈希函数
 
- 直接定址（寻址）法: 取关键字的某个线性函数值为散列地址 如f(key) = a·key + b(a、b是常数)
- 平方取中法：{421，423，436}，平方之后的结果为{177241，178929，190096}，那么可以取中间的两位数{72，89，00}作为Hash地址。
- 折叠法：将关键字拆分成几部分，然后将这几部分组合在一起，以特定的方式进行转化形成Hash地址。假如知道图书的ISBN号为8903-241-23，可以将address(key)=89+03+24+12+3作为Hash地址




### hash 碰撞

- 开放定址法：
  关键字{12，13，25，23，38，34，6，84，91}，Hash表长为14，
  Hash：address(key)=key%11，当插入12，13，25时可以直接插入，而当插入23时，地址1被占用了，因此沿着地址1依次往下探测(探测步长可以根据情况而定)，直到探测到地址4，发现为空，则将23插入其中。

- 链地址法：
  
参考：
[维基百科](https://zh.wikipedia.org/wiki/%E5%93%88%E5%B8%8C%E8%A1%A8)
[简书](https://www.jianshu.com/p/de33dc676a3f)


## 三面
1. 正则
   `/\B(?=(\d{3})+(?!\d))/g`

2. 浏览器的缓存策略
   1. service-work
   2. http 缓存
3. 跨域
   1. cors
   2. jsonP
4. 性能监测，
   [本人文章：你的页面为什么慢，Performance Timeline 简介](https://juejin.im/post/5df3575751882512302db3d5#comment)

5. 数组和链表的区别
   数组是一种线性表数据结构，一组连续的内存空间
   [0, 1, 2, 3]
   链表它并不需要一块连续的内存空间，通过 next 指针 把各部分连起来，和数组相比,链表更适合插入、删除操作频繁的场景
   let a = {val: 1} let b = {val: 2}
   a.next = b;
   [图文解释](https://www.cnblogs.com/klyjb/p/11237361.html)
  
6. 浏览器渲染过程
   [本人博客](https://github.com/MengZhaoFly/blog/issues/26)




