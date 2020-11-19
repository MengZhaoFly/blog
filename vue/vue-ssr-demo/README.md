https://github.com/yujihu/vue-ssr-demo
# Vue SSR&Nuxt.js

## 1. 服务器端渲染(SSR)简介
### 1.1 什么是服务器端渲染(SSR)？
>* Vue.js 是构建客户端应用程序的框架
>* 默认情况下浏览器输出Vue组件，生成DOM并操作DOM
>* 服务器端渲染则是服务器端生成静态的HTML字符串，浏览器将静态标记“混合”为客户端可交互的应用程序
>* 服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行

### 1.2 为什么使用服务器端渲染(SSR)？
与传统 SPA（Single-Page Application - 单页应用程序）相比，服务器端渲染(SSR)的优势主要在于：
>* 更好的 SEO

>> 搜索引擎爬虫抓取工具可以直接查看完全渲染的页面,如果你的应用程序初始展示 loading 菊花图，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再行抓取页面内容。

>* 更快的内容到达时间

>> 无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。

### 1.3 使用服务器端渲染(SSR)需要权衡的地方
>* 开发条件所限

>> 浏览器特定代码，只能在某些生命周期钩子函数中使用；一些外部扩展库可能需要经过特殊处理才能在服务器端使用。

>* 涉及构建设置和部署的更多要求

>> 与可以部署在任何静态文件服务器上的完全静态单页面应用程序(SPA)不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

>* 更多的服务器端负载

>> 在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源(CPU-intensive - CPU 密集)，因此如果你预料在高流量环境(high traffic)下使用，请准备相应的服务器负载，并明智地采用缓存策略。

### 1.4 一个简单的服务器端渲染
#### 1.4.1 安装依赖
```shell
npm install vue vue-server-renderer --save
```
#### 1.4.2 渲染一个 Vue 实例
```javascript
// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
```
#### 1.4.3 与服务器集成
```shell
npm install express --save
```
```javascript
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(8080)
```
#### 1.4.4 使用页面模板
```html
<!DOCTYPE html>
<html lang="en">
  <head><title>Hello</title></head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```
<font color="red">注意</font> `<!--vue-ssr-outlet-->` 注释 -- 这里将是应用程序 HTML 标记注入的地方。
#### 1.4.5 使用模板插值
```html
<html>
  <head>
    <!-- 使用双花括号(double-mustache)进行 HTML 转义插值(HTML-escaped interpolation) -->
    <title>{{ title }}</title>

    <!-- 使用三花括号(triple-mustache)进行 HTML 不转义插值(non-HTML-escaped interpolation) -->
    {{{ meta }}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```
通过传入一个"渲染上下文对象"，作为 renderToString 函数的第二个参数，来提供插值数据
```javascript
const context = {
  title: 'vue ssr',
  meta: `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  `
}
renderer.renderToString(app, context, (err, html) => {
  // 页面 title 将会是 "vue ssr"
  // meta 标签也会注入
})
```
### 1.5 服务器端渲染注意事项
>* 为避免造成交叉请求状态污染，每个请求应该都是全新的、独立的应用程序实例。
>* 由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用。
>* 通用代码不可接受特定平台的 API，因此如果你的代码中，直接使用了像 window 或 document，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此。
>* 大多数自定义指令直接操作 DOM，因此会在服务器端渲染(SSR)过程中导致错误。
>* 浏览器可能会更改的一些特殊的 HTML 结构，例如，浏览器会在 `<table>` 内部自动注入 `<tbody>`，然而，由于 Vue 生成的虚拟 DOM(virtual DOM) 不包含 `<tbody>`，所以会导致无法匹配。

## 2 服务器端渲染构建步骤
我们使用 `webpack` 来处理服务器和客户端的应用程序，大部分源码可以使用通用方式编写，可以使用 `webpack` 支持的所有功能，一个基本项目可能像是这样：
```
├── build
│   ├── webpack.base.config.js     # 基本配置文件
│   ├── webpack.client.config.js   # 客户端配置文件
│   ├── webpack.server.config.js   # 服务端配置文件
└── src
    ├── router          
    │    └── index.js              # 路由工厂
    ├── store          
    │    └── index.js              # 状态工厂
    └── components             
    │    ├── comp1.vue             # 组件1
    │    └── copm2.vue             # 组件2
    ├── App.vue                    # 顶级 vue 组件
    ├── index.template.html        # html 模板
    ├── app.js                     # 通用 entry, 根vue实例工厂
    ├── entry-client.js            # client entry
    ├── entry-server.js            # server entry
├── server.js                      # server 服务
```
### 2.1 app.js
`app.js` 是我们应用程序的「通用 entry」。在纯客户端应用程序中，我们将在此文件中创建根 Vue 实例，并直接挂载到 DOM。但是，对于服务器端渲染(SSR)，责任转移到纯客户端 entry 文件。`app.js` 简单地使用 export 导出一个 `createApp` 函数
### 2.2 entry-client.js
客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中
### 2.3 entry-server.js
服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。此时，除了创建和返回应用程序实例之外，还会执行`服务器端路由匹配`和`服务器端数据预取`逻辑。

对于客户端应用程序和服务器应用程序，我们都要使用 webpack 打包 - 服务器需要「服务器 bundle」然后用于服务器端渲染(SSR)，而「客户端 bundle」会发送给浏览器，用于混合静态标记。

![webpack打包步骤](./images/webpack-bundle.png)

## 3 本文将一步步带您构建一个完整的vue ssr项目
>1. 首先，搭建一个包含交互的简单vue ssr demo，涉及webpack对服务端应用程序和客户端应用程序的打包配置(参考demo1)。
>2. 然后，引入vue-router进行路由相关操作(参考demo2)。
>3. 接着，引入vuex来执行数据预取和状态控制(参考demo3)。
>4. 最后，使用serverBundle和clientBundle进行构建优化(参考demo4)，并在开发环境中进行热重载(参考demo5)。

### 3.1 搭建一个包含交互的简单vue ssr demo
#### 3.1.1 通用代码
`components/Comp1.vue`，vue组件
```html
<template>
  <div>
    <p>组件1</p>
    <button @click="btnClick">click me</button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClick: function () {
      console.log('comp1 cilck')
    }
  }
}
</script>
```
`App.vue`作为应用程序模板
```html
<template>
  <div id="app">
    <Comp1></Comp1>
  </div>
</template>
<script>
import Comp1 from "./components/Comp1";
export default {
  components: { Comp1 }
};
</script>
```
`app.js`作为创建根vue实例的工厂
```javascript
import Vue from "vue";
import App from "./App.vue";

export function createApp() {
  const app = new Vue({
    render: h => h(App)
  })
  return { app }
}
```
`entry-server.js`作为服务器端应用程序的入口，每次渲染中重复调用此函数
```javascript
import { createApp } from './app'

export default context => {
  const { app } = createApp()
  return app
}
```
`entry-client.js`作为客户端应用程序的入口，将vue实例挂载到dom中
```javascript
import { createApp } from './app'
const { app } = createApp()
app.$mount('#app')
```
#### 3.1.2 构建配置
将配置文件分为三个文件：base, client 和 server。基本配置(base config)包含在两个环境共享的配置，例如，输出路径(output path)，别名(alias)和 loader。服务器配置(server config)和客户端配置(client config)，可以通过使用 webpack-merge 来简单地扩展基本配置。

`webpack.base.config.js`主要包含服务器端应用程序和客户端应用程序打包的共享配置
```javascript
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.vue']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000    // 10Kb
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
```
`webpack.server.config.js`生成一个库文件，用于创建传递给`renderToString`的根vue实例
```javascript
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../src/entry-server.js')
  },
  output: {
    libraryTarget: 'commonjs2' //构建一个可以被其他模块引入的模块，该模块通过commonJS2规范导出
  }
});
```
`webpack.client.config.js`生成用户激活服务器端静态标记的client bundle
```javascript
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, '../src/entry-client.js')
  }
});
```
#### 3.1.3 执行构建
```json
//package.json
"scripts": {
    "build:server": "webpack --config build/webpack.server.config.js",
    "build:client": "webpack --config build/webpack.client.config.js"
}
```
#### 3.1.4 服务器代码
在分别执行服务器端应用程序构建和客户端应用程序构建之后生成server bundle和client bundle，用于编写服务器代码。

`server.js`
```javascript
const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})
const createApp = require('./dist/server.bundle').default
const context = {
  title: 'vue ssr',
  meta: `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  `
}
server.use(express.static('dist'))
server.get('*', (req, res) => {
  const app = createApp()
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080)
```

#### 3.1.5客户端激活
客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。

在客户端入口中，我们通过app.$mount('#app')进行应用程序挂载，由于服务器已经渲染好了 HTML，我们显然无需将其丢弃再重新创建所有的 DOM 元素。相反，我们需要"激活"这些静态的 HTML，然后使他们成为动态的（能够响应后续的数据变化）。

在服务器渲染的HTML里应用程序根元素上有一个特殊的属性——data-server-rendered，该特殊属性能够让客户端Vue知道这部分Html是由Vue在服务器端渲染的，并且应该以激活模式进行挂载。

在开发模式下，Vue 将推断客户端生成的虚拟 DOM 树(virtual DOM tree)，是否与从服务器渲染的 DOM 结构(DOM structure)匹配。如果无法匹配，它将退出混合模式，丢弃现有的 DOM 并从头开始渲染。在生产模式下，此检测会被跳过，以避免性能损耗。

### 3.2 路由和代码分割
我们的服务器代码使用了一个 * 处理程序，它接受任意 URL。这允许我们将访问的 URL 传递到我们的 Vue 应用程序中，然后对客户端和服务器复用相同的路由配置。

使用官方提供的 vue-router，类似于 createApp，我们也需要给每个请求一个新的 router 实例，所以文件导出一个 createRouter 函数

`router/index.js`
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Comp1 from '../components/Comp1.vue'
import Comp2 from '../components/Comp2.vue'

Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      redirect: '/comp1'
    }, {
      path: '/comp1',
      component: Comp1
    }, {
      path: '/comp2',
      component: Comp2
    }]
  })
}
```
然后更新`app.js`，创建router实例注入到根vue实例中并返回router
```javascript
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    render: h => h(App)
  })
  // 返回 app 和 router
  return { app, router }
}
```
在 `entry-server.js` 中实现服务器端路由逻辑(server-side routing logic)
```javascript
import { createApp } from './app'

export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 设置服务器端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```
`router.onReady`该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。这可以有效确保服务端渲染时服务端和客户端输出的一致。

然后再次进行打包构建，服务器只需将请求的路径设置到渲染上下文中

`server.js`
```javascript
server.get('*', (req, res) => {
  const context = {
    url: req.url
  }
  createApp(context).then(app => {
    ...
  }).catch(err => { 
    console.log(err)
  })
})
```
### 3.3 数据预取和状态
#### 3.3.1 服务器端数据预取
在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，那么在开始渲染过程之前，需要先预取和解析好这些数据。

另一个需要关注的问题是在客户端，在挂载(mount)到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据 - 否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败。

为了解决这个问题，获取的数据需要位于视图组件之外，即放置在专门的数据预取存储容器(data store)或"状态容器(state container)）"中。首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。

使用官方提供的状态管理库Vuex，类似于 createApp和createRouter，我们也需要给每个请求一个新的store实例。

`store/index.js`
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: {
      username: ''
    },
    actions: {
      getUsername({ commit }) {
        // `store.dispatch()`会返回 Promise，以便我们能够知道数据在何时更新
        return new Promise((resolve, reject) => {
          // 模拟异步请求
          setTimeout(() => {
            resolve('yujihu')
          }, 1000);
        }).then(result => commit('setUsername', result));
      }
    },
    mutations: {
      setUsername(state, username) {
        state.username = username;
      }
    }
  });
}
```
然后更新`app.js`，创建store实例注入到根vue实例中并返回store
```javascript
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    // 创建应用程序实例，将 router 和 store 注入
    router,
    store,
    render: h => h(App)
  })

  // 暴露 app, router 和 store。
  return { app, router, store }
}
```
我们需要通过访问路由，来决定获取哪部分数据 - 这也决定了哪些组件需要渲染。事实上，给定路由所需的数据，也是在该路由上渲染组件时所需的数据。所以在路由组件中放置数据预取逻辑，是很自然的事情。

我们将在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
`components/Comp1.vue`
```html
<template>
  <div>
    <p>组件1</p>
    <button @click="btnClick">click me</button>
  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('getUsername')
  },
  methods: {
    btnClick: function () {
      console.log('comp1 cilck')
    }
  }
}
</script>
```
在 `entry-server.js` 中，我们可以通过路由获得与 `router.getMatchedComponents()` 相匹配的组件，如果组件暴露出 `asyncData`，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。

`entry-server.js`
```javascript
import { createApp } from './app'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
```
当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中。而在客户端，在挂载到应用程序之前，store 就应该获取到状态：

`entry-client.js`
```javascript
import Vue from 'vue'
import { createApp } from './app'
const { app, router, store } = createApp()
})
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
app.$mount('#app')
```
#### 3.3.2 客户端数据预取
由于服务器端渲染只会进行首屏渲染，后续路由跳转及数据预取则交给客户端应用程序处理。可以在路由导航之前（router.beforeResolve）解析数据，也可以在匹配要渲染的视图后（组件的beforeMount钩子中）再获取数据。
>1. 在路由导航之前解析数据

>> 使用此策略，应用程序会等待视图所需数据全部解析之后，再传入数据并处理当前视图。好处在于，可以直接在数据准备就绪时，传入视图渲染完整内容，但是如果数据预取需要很长时间，用户在当前视图会感受到"明显卡顿"。因此，如果使用此策略，建议提供一个数据加载指示器(data loading indicator)。

>> 我们可以通过检查匹配的组件，并在全局路由钩子函数中执行 asyncData 函数，来在客户端实现此策略。注意，在初始路由准备就绪之后，我们应该注册此钩子，这样我们就不必再次获取服务器提取的数据。

`entry-client.js`
```javascript
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })
  app.$mount('#app')
})
```
>2. 匹配要渲染的视图后，再获取数据
>> 此策略将客户端数据预取逻辑，放在视图组件的 beforeMount 函数中。当路由导航被触发时，可以立即切换视图，因此应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。因此，对于使用此策略的每个视图组件，都需要具有条件加载状态。

>> 这可以通过纯客户端(client-only)的全局 mixin 来实现：
```javascript
Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})
```
### 3.4 利用bundle renderer优化

到目前为止，在每次编辑过应用程序源代码之后，我们都必须重新打包代码并重启服务，这在开发过程中会影响开发效率。此外，Node.js 本身不支持 source map。

`vue-server-renderer` 提供一个名为 `createBundleRenderer` 的 API，用于处理此问题，通过使用 webpack 的自定义插件，server bundle 将生成为可传递到 bundle renderer 的特殊 JSON 文件。所创建的 bundle renderer，用法和普通 renderer 相同，但是 bundle renderer 提供以下优点：
>* 内置的 source map 支持（在 webpack 配置中使用 devtool: 'source-map'）
>* 在开发环境甚至部署过程中热重载（通过读取更新后的 bundle，然后重新创建 renderer 实例）
>* 关键 CSS(critical CSS) 注入（在使用 *.vue 文件时）：自动内联在渲染过程中用到的组件所需的CSS。
>* 使用 clientManifest 进行资源注入：自动推断出最佳的预加载(preload)和预取(prefetch)指令，以及初始渲染所需的代码分割 chunk。

#### 3.4.1 生成server bundle
修改`webpack.server.config.js`，生成传递给`createBundleRenderer`的 server bundle。
```javascript
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../src/entry-server.js')
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: /\.css$/
  }),
  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin()
  ]
});
```
打包后会生成`vue-ssr-server-bundle.json`，传递给`createBundleRenderer`。
#### 3.4.2 生成 clientManifest
除了 server bundle 之外，我们还可以生成客户端构建清单(client build manifest)。使用客户端清单(client manifest)和服务器 bundle(server bundle)，renderer 现在具有了服务器和客户端的构建信息，因此它可以自动推断和注入资源预加载 / 数据预取指令(preload / prefetch directive)，以及 css 链接 / script 标签到所渲染的 HTML。

带来的好处:
>1. 在生成的文件名中有哈希时，可以取代 html-webpack-plugin 来注入正确的资源 URL。
>2. 在通过 webpack 的按需代码分割特性渲染 bundle 时，我们可以确保对 chunk 进行最优化的资源预加载/数据预取，并且还可以将所需的异步 chunk 智能地注入为 `<script>` 标签，以避免客户端的瀑布式请求(waterfall request)，以及改善可交互时间(TTI - time-to-interactive)。

要使用客户端清单(client manifest)，客户端配置(client config)将如下所示：

```javascript
const path = require('path');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const base = require('./webpack.base.config');

module.exports = merge(base, {
  entry: {
    client: path.resolve(__dirname, '../src/entry-client.js')
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ],
  optimization: {
    // 将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity
      }
    }
});
```
使用webpack打包构建后会生成vue-ssr-server-bundle.json和vue-ssr-client-manifest.json，服务器就可已使用createBundleRenderer。
```javascript
const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync('./src/index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})
```
#### 3.4.3 开发过程热重载，主要使用`webpack-hot-middleware`和`webpack-dev-middleware`这两个webpack插件。具体代码请参考demo5/build/setup-dev-server.js和demo5/server.js。

## 4 总结
>* 服务器端渲染即为服务器生成静态的html字符串，客户端应用程序将静态的html激活为动态的DOM。服务器端渲染通常只会渲染用于请求的第一个url的页面，即只进行首屏渲染，后续则由客户端应用程序激活代理，控制路由、请求及交互。
>* 服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行。
>* 为避免交叉请求造成状态污染的情况，每个请求都应是全新的、独立的应用程序实例。我们会提取一个工厂函数（createApp），用于创建根vue实例。
>* 所有的生命周期钩子函数中，只有beforeCreate和created会在服务器端渲染(SSR)过程中被调用，其他任何生命周期的代码只会在客户端执行。
>* 客户端入口（entry-client.js）职责是将根vue实例挂在到dom中，用于将服务器端生成的html激活。
>* 服务器端入口（entry-server.js）职责是暴露一个创建根vue实例的方法，可以传入服务器端渲染上下文，我们的服务器代码会为每个请求都调用该方法创建根vue实例并生成html。
>* 关于路由跳转，我们的服务器代码并不会处理请求的url，会透传给服务器端应用程序，由其控制路由跳转。
>* 关于数据预取，通用的数据预取是服务器端渲染最复杂的问题，分为客户端数据预取和服务器端数据预取。
>* 服务器端数据预取，针对用户的请求我们需要预取相关的数据然后进行渲染，需要页面组件暴露asyncData方法，在页面渲染前调用路由匹配组件的该方法，填充到vue store中，并挂载到服务器渲染上下文上，生成的页面会自动挂在store中内容，客户端程序只需将其同步到客户端store中。
>* 客户端数据预取，由于服务器端只进行首屏渲染，后续路由跳转及数据预取则交给客户端应用程序处理。可以在路由导航之前（router.beforeResolve）解析数据，也可以在匹配要渲染的视图后（组件的beforeMount钩子中）再获取数据。
>* 用webpack对服务器端应用程序和客户端应用程序分别进行打包，生成server bundle用于在服务器生成根vue实例，并进行相应的路由匹配、数据预取逻辑，生成client bundle用于在客户端激活服务器端发送的静态html。