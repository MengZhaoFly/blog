## webpack 
1. 选项 -- watch 
文件更新 自动打包
2. webpack-node-externals
node 自带模块采用 external 形式

## 中间层

1. 请求流程
fe - node - api
## 无中间层流程
1. 请求流程
fe-api
fe-node
node-api

假如fe 出错了 有可能是 node server 也有可能是 api server
介入中间层 中转 fe 出错 直接找 node 然后 node 出错 就再找 api server

## 多级路由嵌套
简单一层路由： 可以简单使用 map
多级路由采用： react-router-config 提供的 renderRoutes


## 涉及登录的时候
服务端 cookie 处理
把 req 传递给 axiosIns

## 404 处理
服务端：context 传递 一个对象 {}
组件
获取 staticContext 在里面添加一个 { notFound: true}
然后 服务端再次判断 决定 404 还是 200

## 301 
如果 访问了 需要权限的页面   加载了 
```js
<Redirect />
```
那么react-router 会加一个 action：REPLACE
借助这个信息，重定向 301

## ssr 请求 api 出错

请求出错，影响的就是 页面没有数据。
所以 改造 promise
无论失败还是成功，我们都按照成功处理


## css 服务端渲染
isomorphic-style-loader
style-loader
都会
解析 css 类名，加在标签上
```js
class="app_test_2rprQ"
```

style-loader 额外插入css 到 style 标签之内

```js
import style from 'x.css';
// isomorphic-style-loader 会提供两个方法
{ test: 'app_test_2rprQ',
  _getContent: [Function],
  _getCss: [Function],
  _insertCss: [Function] }
```
结合 上文 提到的 staticContext , 可以在 生命周期里面把
css 塞进去，这样服务端就能拿到 css 字符串了