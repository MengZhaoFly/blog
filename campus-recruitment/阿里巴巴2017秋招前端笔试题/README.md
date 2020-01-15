
阿里巴巴2017秋招前端笔试题

1. 下面的 JSX 代码中，哪一个无法达到预期的效果？  
   1. `<h2>Hello World</h2>`
   2. `<input type=”checkbox”/>`
   3. `<div class=”msg-box”>{msg}</div>`  
   4. `<label htmlFor=”name”>Leo</label>`  <label for="" />
   5. `<div style={{height: 50}}></div>`
   6. `<img src={imgSrc}/>`
   
  答案：3

2. 正则表达式 `/a+(bab)?(caac)*/`，下列选项中是该正则表达式的子集是？
   1. `/(bab)(caca)/`    // babcaca
   2. `/a(bab){2}(caac)*/`
   3. `/a{2}/`           // 
   4. `/a+(bab){0,1}(ca)+(ca)/`
   5. `/a(^bab)+(caac){1,}/`
   6. `/a+(babc){2,}(acc){1,}/`

  a 1/many  
  bab 1/0
  caac 0/many
  答案：3

3. 下列说法错误的是：
   1. 在Blink和WebKit的浏览器中，某个元素具有3D或透视变换（perspective transform）的CSS属性，会让浏览器创建单独的图层。
   2. 我们平常会使用left和top属性来修改元素的位置，但left和top会触发重布局，取而代之的更好方法是使用translate，这个不会触发重布局。
   3.  移动端要想动画性能流畅，应该使用3D硬件加速，因此最好给页面中的元素尽量添加translate3d或者translateZ(0)来触发3D硬件加速。 
   4.  解决浏览器渲染的性能问题时，首要目标就是要避免层的重绘和重排。

  解析：
  图层条件：https://juejin.im/post/5df0b04951882512632e73ea#heading-7

  答案：3



4. 将数组var a=[1,2,3]变成数组[4,3,2,1]下面的方式正确的是？
   1.  a.reverse().unshift(4)    
   2.  a.push(4).reverse()   // 4.reverse()
   3.  a.push(4); a.reverse() 
   4.  a.splice(3,1,4).reverse()

  答案： 1/3

5.  目前HTTP2协议已经逐渐普及到日常服务器中，以下对于HTTP2协议描述正确的是：
    1.   所有http请求都建立在一个TCP请求上，实现多路复用 
    2.   可以给请求添加优先级 
    3.   server push 
    4.   从而减少流量传输


  答案：1、2、3、4

http2 特点：
- 多向请求与响应： http1. req1 req2     解决了HTTP 1.x 中存在的队首阻塞
- 请求优先级
- 请求都建立在一个TCP请求上，实现多路复用
- 服务器推送
- 首部压缩

参考：
>[csdn](https://blog.csdn.net/zqjflash/article/details/50179235)


6. 请问下面哪种方式可以在不改变原来数组的情况下，拷贝出数组 b ，且满足 b!=a 。例如数组 a 为 [1,2,3] 。
   1.  let b=a; 
   2.  let b=a.slice(); 
   3.  let b=a.splice(0,0); 
   4.  let b=a.concat();

  答案：2 / 4

7. 以下代码，分别给节点#box增加如下样式，问节点#box距离body的上边距是多少？
   1. 如果设置 position: static ; 则上边距为 ? px   //  20
   2. 如果设置 position: relative ;  则上边距为 ? px
   3. 如果设置 position: absolute ; 则上边距为 ?  px
   4. 如果设置 position: sticky ;  则滚动起来上边距为 ? px
  ```html
  <body style=”margin:0;padding:0”>
   <div id=”box” style=”top:10px;margin:20px 10px;”>
   </div>
  </body>
  ```
  答案：
  1： 20
  2： 20 + 10
  3： 父级第一个非 static 10 + 20
  4： 10

8. 我们需要实现动态加载一个 JavaScript 资源，但是有几处不知道如何处理，需要您的帮助完成这一项工作

```js
var script = document.createElement(“script”);

var head = document.getElementsByTagName(“head”)[0];


script.type = “text/javascript”;

script.src = “//i.alicdn.com/resource.js”;
// 绑定资源加载成功事件
script.1 = function( ){
// 判断资源加载状态是否为加载成功或加载完成
};

// 绑定资源加载失败事件
script.4 = function( ) {
  . . . .
};
head.insertBefore (script , head.firstChild)
```
答案：onLoad onError

9. 题目描述请使用两种不同的CSS方法（要求dom结构不同）实现下图所示的条形图。从左到右的条形分别记为A,B,C,D,E。A的高度为30%，颜色为#f00；B的高度为80%，颜色为#ddd；C的高度为70%，颜色为#0fd；D的高度为60%，颜色为#ff0；E的高度为90%，颜色为#234，每个条形之间的距离可以任意设置（可以考虑使用CSS3新属性来实现）。

 flex dis-inlineBLock

10.  题目描述
请实现方法 parse ，作用如下：
```js
var object = {
 b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
};
console.log( parse(object, ‘b.c’) == 4 ) //true
console.log( parse(object, ‘d[0].e’) == 5 ) //true
console.log( parse(object, ‘d.0.e’) == 5 ) //true
console.log( parse(object, ‘d[1].e’) == 6 ) //true
console.log( parse(object, ‘d.1.e’) == 6 ) //true
console.log( parse(object, ‘f’) == ‘undefined’ ) //true
```

11. 题目描述请问何为混合应用 (Hybrid APP) ，与原生 Native 应用相比它的优劣势。

Hybrid: Native + h5

h5: 开发
热更新
成本


  