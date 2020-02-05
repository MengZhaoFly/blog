## 前言

本人不是标题党，在假期期间，灾难面前，给国家做贡献，在家安心准备春招，刷了几个大公司的前端笔试题，它们的题目都挺不错的。正所谓：千里之行，始于足下。基础有多好，楼就能盖多高。

从题库里面精选了几道，也欢迎大家都来尝试一下, 真正检查一下，是否真正掌握。

## 题目

来源于
>[牛客网前端真题](https://www.nowcoder.com/contestRoom?mutiTagIds=644)

![](https://user-gold-cdn.xitu.io/2020/2/4/1700eb567ca8cb2f?w=2386&h=620&f=png&s=306102)

## 来自哔哩哔哩2020校园招聘技术类笔试卷

### 1. 下列代码的运行输出结果是?
```js
var a = {};
var b = { key: 'b' }; var c = { key: 'c' }
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
```

选项：

- [ ] `{key: 'b'}`
- [ ] `{key: 'c'}`
- [ ] `b`
- [ ] `c`


<details>
<summary>查看解析</summary>

方括号中的所有键都将转换为字符串类型，因为JavaScript中的对象只能使用只支持 `string` 和 `Symbol`作为键类型。 在上面的代码中，当将键 `b`, `c` 添加到 `a` 时，`JavaScript`将调用`obj.toString()`方法，并将此结果字符串用作新键。

```js
a[b] 等同于 a[b.toString()] 等同于 a['[object Object]']
a[c] 等同于 a[c.toString()] 等同于 a['[object Object]']
```
最终会有覆盖关系，导致 输出为：**c**

</details>

### 2. 下列有运行输出什么？

```js
['10', '10', '10', '10', '10'].map(parseInt);
```

- [ ] `[NaN, NaN, NaN, NaN]`
- [ ] `[10, 10, 10, 10, 10]`
- [ ] `[NaN, 2, 3, 4, 5]`
- [ ] `[10, NaN, 2, 3, 4]`

<details>
<summary>查看解析</summary>

这是一道 `函数式` 风格的题目，
`parseInt` 作为 `map` 的回调方法，会接受 map 的所有参数，即第一项：循环时该项的值，循环时候的索引。

```js
map('10', 0)
map('10', 1)
map('10', 2)
// parseInt 的两个参数
// 1:对谁 parseInt ？
// 2: 这个数是几进制的？进制位于 2 ~ 36 之间

parseInt('10', 0) 10  // 0 会被转为 10进制
parseInt('10', 1) NaN
parseInt('10', 2) 2(2 ^ 0 + 2 ^ 1)
parseInt('10', 3) 3^0 + 3^1
parseInt('10', 4) 4^0 + 4^1
```

输出：**[10, NaN, 2, 3, 4]**

</details>

### 3. 下列代码的运行输出结果是?

```js
var age = 100;
let yeas = 6;
if (age > 12) {
  let age = 10;
  var years = age * 3;
}
console.log(`${years} years`)
```
- [ ] 6
- [ ] 30
- [ ] 报错: Uncaught SyntaxError: Identifier ‘age’ has already been declared
- [ ] 报错: Uncaught SyntaxError: Identifier 'years' has already been declared

<details>
<summary>查看解析</summary>

`var age`:  全局的 age;

`let yeas`:  全局的 yeas;

```js
if (age > 12) {
  let age = 10;
  var years = age * 3;
}
```
块级的 age,

因为 var 的变量提升产生一个：全局的 years。

发现全局作用域里面同时存在两个 `years`,

两次声明，所以：**报错: Uncaught SyntaxError: Identifier 'years' has already been declared**

</details>

### 4. 以下关于跨域说法错误的是？

- [ ] Cookie，LocalStorage和IndexedDB都会受到同源策略的限制
- [ ] postMessage，JSONP，WebSocket都是常用的解决跨域的方案
- [ ] 跨域资源共享规范中规定了除了GET之外的HTTP请求，或者搭配某些MINE类型的POST请求，浏览器都需要先发一个OPTIONS请求
- [ ] http://www.bilibili.com和https://www.bilibili.com是相同的域名，属于同源

<details>
<summary>查看解析</summary>

同源: 协议、域名、端口号
所以 **D 答案 描述错误**
其他正确的答案，当复习一下。
</details>

### 5. 关于canvas和svg说法正确的是？
- [ ] canvas支持事件处理器
- [ ] canvas不依赖分辨率，缩放不失真
- [ ] svg不依赖分辨率，缩放不失真
- [ ] svg适合图像密集型的游戏

<details>
<summary>查看解析</summary>
canvas 内部元素的点击需要自己根据点击坐标处理，不支持事件处理。
svg 属于 矢量图（缩放不失真）
正确答案：**svg不依赖分辨率，缩放不失真**
</details>

### 6. 关于DOMContentLoaded和load事件说法正确的是？

- [ ] DOMContentLoaded事件比load事件更早执行
- [ ] load事件比DOMContentLoaded事件更早执行
- [ ] 按监听代码从上到下先后执行
- [ ] dom文档完全加载完后执行load事件

<details>
<summary>查看解析</summary>

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。另一个不同的事件 load 应该仅用于检测一个完全加载的页面。

>[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
 
正确答案: **A**
</details>

### 7. 下列代码的运行输出结果是?
```js
[1 < 2 < 3, 3 < 2 < 1]
```
- [ ] `[true, true]`
- [ ] `[true, false]`
- [ ] `[false, true]`
- [ ] `[false, false]`

<details>
<summary>查看解析</summary>

同等优先级运算符，从左往右，

先比较 `1 < 2` 得到 true，在比较 `true < 3` ，会进行一次类型转换，true 被转换为数字 1，false 转为 0。
所以最后比较的是 `1 < 3`
结果为 **true**。同理 `3 < 2 < 1` 也为 **true**

</details>

### 8. 下列代码的运行输出结果是?
```js
function setname(name){
 this.name = name
}
setname.prototype.printName = function(){ console.log(this.name) }
let a = new setname("cc")
a.name = "dd"
a.__proto__.name = "ee"

a.__proto__.printName()  // ?
a.printName() // ?
```
- [ ] ee dd
- [ ] cc dd
- [ ] ee cc
- [ ] ee Error

<details>
<summary>查看解析</summary>

this 指向题目的考察：
一个宗旨：谁调用指向哪里。

`a.__proto__.printName()`: this 指向 a.__proto__，输出它的 name 为 ee

`a.printName()`: this 指向 a，输出它的 name 为 dd

</details>

### 9. 下列代码的运行输出结果是?

```js
-1 >>> 32
```

<details>
<summary>查看解析</summary>

` >>> 无符号右移`
 
 解题步骤：
 
 |数字|二进制|
|:-|:-:|
|1|0000 0000 0000 0000 0000 0000 0000 0001|
|1的反码|1111 1111 1111 1111 1111 1111 1111 1110|
|-1（1的补码：反码 + 1）|1111 1111 1111 1111 1111 1111 1111 1111|

得到 -1 的 二进制，开始右移，右移多少位呢。题目是32位（对于 >= 32 位的，需要 % 32 ）得到 0。即 不移动，所以 -1 >>> 32 的结果就是：1111 1111 1111 1111 1111 1111 1111 1111。

为了好表示：`1111 1111 1111 1111 1111 1111 1111 1111` + `1` = `1 0000 0000 0000 0000 0000 0000 0000 0000` = `2 ^ 32 -1` 


</details>

### 10. 有n级台阶，每一步可以走1级或2级，问一共有多少种走法
<details>
<summary>查看解析</summary>

经典的跳台阶问题：
可参考：[跳台阶详解](https://blog.csdn.net/sinat_25972161/article/details/72456518)
</details>

### 11. 括号匹配
判断由"()[]{}"6种括号组成的字符串是否合法
1. 所有括号必须闭合
2. 左括号必须在正确的位置闭合

<details>
<summary>查看解析</summary>

经典的括号匹配问题：
可参考我之前在 bilibili 录过：[括号匹配详解](https://www.bilibili.com/video/av85982999?p=2)
</details>

### 12. k个一组翻转链表
给你一个链表，每 k 个节点一组进行翻转，请返回翻转后的链表。
如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

示例 :
给定这个链表：1->2->3->4->5
当 k = 2 时，应当返回: 2->1->4->3->5
当 k = 3 时，应当返回: 3->2->1->4->5

<details>
<summary>查看解析</summary>

经典的链表反转问题：
可参考我之前在 bilibili 录过：[链表反转详解](https://www.bilibili.com/video/av83394837?p=4)
</details>

## 来自阿里巴巴2017秋招前端笔试题

### 13. 下列说法错误的是：

- [ ] 在Blink和WebKit的浏览器中，某个元素具有3D或透视变换（perspective transform）的CSS属性，会让浏览器创建单独的图层。
- [ ] 我们平常会使用left和top属性来修改元素的位置，但left和top会触发重布局，取而代之的更好方法是使用translate，这个不会触发重布局。
- [ ] 移动端要想动画性能流畅，应该使用3D硬件加速，因此最好给页面中的元素尽量添加translate3d或者translateZ(0)来触发3D硬件加速。 
- [ ] 解决浏览器渲染的性能问题时，首要目标就是要避免层的重绘和重排。

<details>
<summary>查看解析</summary>

图层创建条件：

- video
- 有 3D transform
- backface-visibility 为 hidden
- 对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition（需要是 active 的 animation 或者 transition，当 animation 或者 transition 效果未开始或结束后，提升合成层也会失效）
- will-change 设置为 opacity、transform、top、left、bottom、right（其中 top、left 等需要设置明确的定位属性，如 relative 等）
- 重叠原因

更多图层文章可以查看：[浏览器层合成与页面性能优化](https://juejin.im/post/5df0b04951882512632e73ea)

物极必反
图层越多越好吗？
当然不是。提升合成层也得 消耗额外的内存和管理资源，
正所谓切勿提前优化。

>正如MDN所说: 如果你的页面在性能方面没什么问题，则不要添加 will-change 属性来榨取一丁点的速度。 will-change 的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题.

错误的是：**C**

</details>

### 14. 以下代码，分别给节点#box增加如下样式，问节点#box距离body的上边距是多少？
- [ ] 如果设置 position: static ; 则上边距为 ? px   //  20
- [ ] 如果设置 position: relative ;  则上边距为 ? px
- [ ] 如果设置 position: absolute ; 则上边距为 ?  px
- [ ] 如果设置 position: sticky ;  则滚动起来上边距为 ? px
  ```html
  <body style=”margin:0;padding:0”>
   <div id=”box” style=”top:10px;margin:20px 10px;”>
   </div>
  </body>
  ```
 <details>
<summary>查看解析</summary>
  答案：
  考察 position
  - 1： 20
  - 2： 20 + 10
  - 3： 父级第一个非 static 10 + 20
  - 4： 10
  
</details>

### 15. 我们需要实现动态加载一个 JavaScript 资源，但是不知道如何处理，需要您的帮助完成这一项工作。

<details>
<summary>查看解析</summary>

```js
var script = document.createElement(“script”);

var head = document.getElementsByTagName(“head”)[0];


script.type = “text/javascript”;

script.src = “//i.alicdn.com/resource.js”;
// 绑定资源加载成功事件
script.onLoad = function( ){
// 判断资源加载状态是否为加载成功或加载完成
};

// 绑定资源加载失败事件
script.onError = function( ) {
  . . . .
};
// 插到页面中才会根据 src 属性，发出请求。
head.insertBefore (script , head.firstChild)
```

</details>

### 16. 目前HTTP2协议已经逐渐普及到日常服务器中，以下对于HTTP2协议描述正确的是：
- [ ] 所有http请求都建立在一个TCP请求上，实现多路复用 
- [ ] 可以给请求添加优先级 
- [ ] server push 
- [ ] 从而减少流量传输

<details>
<summary>查看解析</summary>
  答案：1、2、3、4

http2 特点：
- 多向请求与响应： http1. req1 req2     解决了HTTP 1.x 中存在的队首阻塞
- 请求优先级
- 请求都建立在一个TCP请求上，实现多路复用
- 服务器推送
- 首部压缩

</details>

### 17. 正则表达式 `/a+(bab)?(caac)*/`，下列选项中是该正则表达式的子集是？

- [ ] `/(bab)(caca)/`    // babcaca
- [ ]  `/a(bab){2}(caac)*/`
- [ ] `/a{2}/`           // 
- [ ] `/a+(bab){0,1}(ca)+(ca)/`
- [ ] `/a(^bab)+(caac){1,}/`
- [ ] `/a+(babc){2,}(acc){1,}/`

<details>
<summary>查看解析</summary>

正则表达式 `/a+(bab)?(caac)*/` 表示：

![](https://user-gold-cdn.xitu.io/2020/2/4/1700f1fd91fdd9e7?w=1878&h=414&f=png&s=45142)

选项：
- 1：匹配 babcaca
- 2：与 题目 a 可以出现 0 次 不符
- 3：正确：a 1次/多次 、bab 1次/0次、caac 0次/多次

答案：**C**



</details>

## 18. 来自小米2019秋招前端开发笔试题（B）

### 15. 有一组数据“12,15,1,18,2,35,30,11”，用选择法由小到大排序，第2趟交换数据后数据的顺序是（）

<details>
<summary>查看解析</summary>

选择排序：每次从待排序数组中选择一个最小的或者最大的进行交换，依次组成已排序数组，

- 1,15,12,18,2,35,30,11
- 1,2,12,18,15,35,30,11

</details>

### 19. 下面哪种排序算法不是稳定的（）
- [ ] 归并
- [ ] 冒泡
- [ ] 插入
- [ ] 快速排序

<details>
<summary>查看解析</summary>

不是稳定排序速记：
快速排序、冒泡排序、堆排序、归并排序、插入排序
写代码太难了，快（**快速**）些（**希尔**）选（**选择排序**）一堆（**堆排序**）朋友来聊天吧

</details>

### 20. 设计一个函数，传入一个可序列化为树结构的字符串，将含有多个子节点的节点以数组的形式输出。

输入描述:
```js
{ node: 'root', next: [ { node: 'second_root' }, { node: 'second_child', next: [{ node: 'second_child_1', next: { node: 'second_child_1_1' } }, { node: 'second_child_2' }] }, { node: 'third_root', next: { node: 'third_child' , next: [{ node: 'third_child_1', next: { node: 'third_child_1_1' } }, { node: 'third_child_2' }] } } ] }
```
输出：
```js
["root","second_child","third_child"]
```
<details>
<summary>查看解析</summary>

在一棵树里查找某节点的孩子是否有多个，遍历一次树即可。
这里 readline 模块为处理 牛客网的输入，输出。

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
let list = [];
function solution(obj) {
  if (obj.next) {
    if (!(obj.next.length)) {
      solution(obj.next)
    } else {
      list.push(obj.node);
      for (var i = 0; i < obj.next.length; i++) {
        solution(obj.next[i]);
      }
    }
  }
}
rl.on('line', (line) => {
  console.log(line);
  const obj = eval(`o = ${line}`);
  solution(obj);
  console.log(JSON.stringify(list))
  rl.close();
})
```

</details>

### 21. 设计一个函数，两个参数，第一个参数为整数的数组，第二个参数为标杆值，取数组中任意符合两个数相加为标杆值的下标相加到一起的值

传入一串字符串（如下例子所示），转义为数组，除去数组中最后一位数字作为标杆值，取数组中任意符合两个数相加为标杆值的下标，输出所有符合要求的下标的和。

如下解释：
```js
value：0,1,5,11,17,16,2,5,10,30,12
index：1 3  6  8
```
输出结果为18

<details>
<summary>查看解析</summary>

类似 leetcode 第一道题（two sum），暴力枚举数组里所有两数相加的情况。

```js
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
function solution(input){
    var arr = input.split(",");
    var arrInt = arr.map(e => parseInt(e));
    var result = 0;
    var temp = arrInt.pop();
    for(let i=0; i<arrInt.length-1;i++){
        for(let j=i+1; j<arrInt.length; j++){
            if(arrInt[i] + arrInt[j] == temp){
              // arrTemp.push(i,j);
              result += (i + j);
            }
        }
    }
    return result;
}
rl.on('line',(line) => {
    console.log(solution(line));
    rl.close();
})
```


</details>

### 22. 某进程的页面访问顺序为 1、3、2、4、2、3、1、2，系统最多分配 3 个物理页面，采用 LRU 算法，运行过程中会出现（ ）次缺页？

- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 6

<details>
<summary>查看解析</summary>

（Least Recently Used，LRU）
如果操作系统内存中没有空闲页面，则操作系统必须在内存选择一个页面将其移出内存

LRU： 把过去最长一段时间里不曾被使用的页面置换掉。

[页面置换算法](https://baike.baidu.com/item/%E9%A1%B5%E9%9D%A2%E7%BD%AE%E6%8D%A2%E7%AE%97%E6%B3%95/7626091)
- 1       缺 1
- 3,1     缺 3
- 2,3,1   缺 2
- 4,2,3   缺 4
- 2,4,3    
- 3,2,4    
- 1,3,2    缺 1
- 2,1,3

答案：**5**
</details>

### 23. 将长度为n的单链表链接在长度为m的单链表后面，其算法的时间复杂度釆用大O形式表示应该是（ ）
- [ ] O(1)
- [ ] O(n)
- [ ] O(m)
- [ ] O(n+m)

<details>
<summary>查看解析</summary>

需要遍历链表m,找到尾结点，复杂度为O(m) 
</details>

## 总结

这是我觉得还不错的几道题目，有些经典的算法，也有耐人寻味的js基础。

关于这些题的讲解，我还准备了 视屏版本。你可以观看我在 **b站**上视屏讲解。
未来我会继续录制各个大厂以往的笔试真题。

**视屏：**[点击观看，喜欢一个收藏](https://www.bilibili.com/video/av83427212?p=6)

**源码：**[点击查看，喜欢可以star](https://github.com/MengZhaoFly/blog/tree/master/campus-recruitment)

如果你正在准备面试，我们也可以一起交流QQ群号：791201829，希望我们可以互相帮助，offer 拿到手软。



