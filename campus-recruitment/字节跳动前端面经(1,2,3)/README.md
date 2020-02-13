
## type
6: null undefined string number bool Symbol
1: Object

## 检测
Obejct.prototype.toString.call()
typeOf: null function

## 
```js
// 1
Child.prototype = new Parent()
// 2
Child.prototype = Object.create(Parent.prototype)
// 3 寄生组合
function Child() {
  Parent.call(this);
}
Child.prototype = Object.create(Parent.prototype)
var c = new Child();
c.
```
## 闭包
```js
function foo() {
  var a = 1;
  return () => {
    return a;
  }
}
foo();
```


## 服务端检测
点击登录按钮之后
-》服务端校验 -》Session
[
  {
    sessionID: 001
    uid: lilei001,
    expires: 60
  },
  {
    sessionID: 002
    uid: lilei002,
    expires: 60
  }
]
-> cookie 001 交给前端
-> 每次带上  cookie 001
-> 后段每次都知道登录状态了

httponly： js修改不了

## 重定向状态码

301: 永久重定向

常用的例如域名跳转：http:**** => https:****

a -> b
客户端往后直接 请求 b

302: 临时重定向

重定向时怎样传重定向到哪个地址：响应头（Location 字段）
[http-status-code](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
[Location](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Location)


## XSS 、 csrf

## __proto__
```js
.__proto__ = {} 
setPrototypeOf
```
[setPrototypeOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

## loginTime loutTime 峰值
86400:变化情况
[2, 10, -3]
86400: 在线人数
[2, 12, 9]

[https://www.iteye.com/blog/sfdlut-live-cn-1219285](https://www.iteye.com/blog/sfdlut-live-cn-1219285)