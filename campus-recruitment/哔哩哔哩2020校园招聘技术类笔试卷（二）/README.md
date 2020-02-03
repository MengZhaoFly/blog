[哔哩哔哩2020校园招聘技术类笔试卷（二）](https://www.nowcoder.com/test/20725660/summary)


1. canvas svg   
- canvas 内部元素事件需要自己处理（根据鼠标点击的坐标，判断坐标位于哪个元素之内）
- canvas 位图（像素点） svg 矢量图(基本图形：点 线 圆构成的)
- 游戏一般会用 canvas 做

2. a
- onclick -> e.preventDefault - > 阻止 a 标签跳转

3. 跨域
- 同源：协议、域名、端口

4. link
属性：
- as：该属性仅在 `<link>` 元素设置了 rel="preload" 时才能使用,加载的内容的类型
- rel: preload 告诉浏览器下载资源，因为在当前导航期间稍后将需要该资源。
- rel: prefetch 来告诉浏览器用户将来可能在其他页面（非本页面）可能使用到的资源，那么浏览器会在空闲时


5. html
- <aside>: 侧边栏
- footer
- area：<area> 标签可以在图像上划分区域，这些区域是可以点击的，并且对应不同的操作 [eg](https://www.w3cschool.cn/tryrun/showhtml/tryhtml_areamap)
- summary: `<summary>HTML 5</summary> This document teaches you everything you have to learn about HTML 5.</details>`

6. css
margin: 父元素设置了 margin，对子元素有影响吗？？？

7. 优先级

8. transition:一个元素在不同状态之间切换的时候定义不同的过渡效果
   由于之前没有高度，瞬间到达100

9. 对 style 的操作改变color、background-color会repaint，改变padding、margin会relayout
10. splice
11. 节流防抖
    - throttling，节流的策略是，固定周期内，只执行一次动作 (平均3s)，既然是3s一次，也可以根据时间判断
    - debounce 的特点是当事件快速连续不断触发时，动作只会执行一次 (3s)

12. + 操作会转换为 数字，jsonStringfy 会把 undefined 的值 丢弃
13. js
```js
var a = {};
var b = { key: 'b' }; var c = { key: 'c' }
a[b] = 'b';
a[c] = 'c';
console.log(a[b]);
```
对象的 key 为：`string`/`symbol`
其他的会进行 `toString`

14. -1 >> 32：有符号右移

|数字|二进制|
|:-|:-:|
|1|0000 0000 0000 0000 0000 0000 0000 0001|
|1的反码|1111 1111 1111 1111 1111 1111 1111 1110|
|-1（1的补码：反码 + 1）|1111 1111 1111 1111 1111 1111 1111 1111|

右移位数的确定：右移 x 位：如果 x >= 32 那么 右移（x % 32）
右移：32 % 32
未移动：原来 -1 现在还是 -1


15.  ['10', '10', '10', '10', '10'].map(parseInt);

```js
map('10', 0)
map('10', 1)
map('10', 2)
// 对谁 parseInt ？
// 这个数是几进制的？
// 进制 2 ~ 36
// 0 -> 10
parseInt('10', 0) 10
parseInt('10', 1) NaN
parseInt('10', 2) 2(2 ^ 0 + 2 ^ 1)
parseInt('10', 3) 3^0 + 3^1
parseInt('10', 4) 4^0 + 4^1
```

1.  js

函数已经调用，所以拿到的是一个字符串

17. js
18. event-loop
    - task： settimeout
    - microTask: promise.then()
    - 保证microTask执行清空以后，每次从task 取出一个任务执行，microTask 取出所有的任务执行，再从task 取出一个任务
    - 1 2 7
    - task：【timeout】microTask【promise.then】
    - task：【timeout】microTask【promise.then， promise.then】
    - 5 6 3

19. js var 变量提升
```js
var age = 100;
let yeas = 6;
if (age > 12) {
  let age = 10;
  var years = age * 3;
}
console.log(`${years} years`)
```
20. 编码

- escape：废弃
- encodeUrlComponent: 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。
- encodeUrl: 一个URI是完整的URI，那么无需对那些保留的并且在URI中有特殊意思的字符进行编码

>[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

21. 复数
[复数运算规则](https://baike.baidu.com/item/%E5%A4%8D%E6%95%B0%E8%BF%90%E7%AE%97%E6%B3%95%E5%88%99/2568041?fr=aladdin)

> z1=a+bi，z2=c+di 
> 相乘(a+bi)(c+di)，展开得: ac+adi+bci+bdi^2，因为i2=-1
> 所以结果是(ac－bd)+(bc+ad)i 


23. [k反转链表](https://www.bilibili.com/video/av83394837)