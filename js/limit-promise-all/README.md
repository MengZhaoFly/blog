https://github.com/rxaviers/async-pool/blob/master/lib/es6.js

## 背景
通常，我们在需要保证代码在多个异步处理之后执行，会用到：

Promise.all(promises: []).then(fun: function);
Promise.all可以保证，promises数组中所有promise对象都达到resolve状态，才执行then回调。

如果你的promises数组中每个对象都是http请求，或者说每个对象包含了复杂的调用处理。而这样的对象有几十万个。

那么会出现的情况是，你在瞬间发出几十万http请求




