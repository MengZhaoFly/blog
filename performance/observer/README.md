

[entryType](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType)
[longtask](https://www.itcodemonkey.com/article/10654.html)
## 各类型介绍

1. longtask
   1. entry
      1. name: self：页面自身，例如执行某 JavaScript 函数
      2. rendering：event loop 中的 update the rendering 步骤，例如页面大量元素需要 relayout
      3. browser：与 event loop 彻底无关
2. navigation
   导航相关
3. resource 资源
4. paint    绘制