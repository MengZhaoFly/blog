# Nuxt.js

## Nuxt.js是什么？
>* 一个基于 `Vue.js` 的通用应用框架
>* 基于它初始化新项目的基础结构代码，或者在已有 `Node.js` 项目中使用
>* 预设了利用 `Vue.js` 开发服务端渲染的应用所需要的各种配置
>* 提供了一种命令叫：nuxt generate，为基于 Vue.js 的应用提供生成对应的静态站点的功能
>* 为 `客户端/服务端` 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等

## Nuxt.js的特性
>* 基于 Vue.js
>* 自动代码分层
>* 服务端渲染
>* 强大的路由功能，支持异步数据
>* 静态文件服务
>* ES6/ES7 语法支持
>* 打包和压缩 JS 和 CSS
>* HTML头部标签管理
>* 本地开发支持热加载
>* 集成ESLint
>* 支持各种样式预处理器： SASS、LESS、 Stylus等等
>* 支持HTTP/2 推送

## 目录结构
```
├── assets/        # 资源目录 assets 用于组织未编译的静态资源如 LESS、SASS 或 JavaScript
├── components/    # 组件目录 components 用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 asyncData 方法的特性。
├── layouts/       # 布局目录 layouts 用于组织应用的布局组件
├── middleware/    # middleware 目录用于存放应用的中间件
├── pages/         # 页面目录 pages 用于组织应用的路由及视图。Nuxt.js 框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。
├── plugins/       # 插件目录 plugins 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
├── server/        # 
├── static/        # 静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下
├── store/         # 用于组织应用的 Vuex 状态树 文件。 Nuxt.js 框架集成了 Vuex 状态树 的相关功能配置，在 store 目录下创建一个 index.js 文件可激活这些配置
├── nuxt.config.js # 用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置
├── package.json   # 用于描述应用的依赖关系和对外暴露的脚本接口
```

## 配置
Nuxt.js 默认的配置涵盖了大部分使用情形，可通过 nuxt.config.js 来覆盖默认的配置。

```javascript
module.exports = {
  build: {},       // 根据服务端需求，自定义 webpack 的构建配置，如babel配置、devServer配置等
  cache: true,     // 开启组件缓存策略以提升渲染性能
  css: [],         // 配置全局的 CSS 文件、模块、库
  dev: true,       // 配置 Nuxt.js 应用是开发模式还是生产模式
  env: {},         // 配置在客户端和服务端共享的环境变量, 通过 process.env.* 或 context.*来使用
  generate: {},    // 配置 Nuxt.js 应用生成静态站点的具体方式，当运行 nuxt generate 命令或在编码中调用 nuxt.generate() 时，Nuxt.js 会使用 generate 属性的配置
  head: {},        // 配置应用默认的meta标签
  loading: {},     // 用于个性化定制 Nuxt.js 使用的加载组件, 在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。可以定制它的样式，禁用或者创建自己的加载组件
  modules: [],     // modules是Nuxt.js扩展，可以扩展它的核心功能并添加无限的集成
  modulesDir: [],  // 用于设置路径解析的模块目录，例如：webpack resolveLoading，nodeExternal和postcss
  plugins: [],     // 用于配置那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
  rootDir: '',     // 用于配置 Nuxt.js 应用的根目录，该配置项的一个限制是应用的 node_modules 目录必须在 rootDir 目录内
  router: {},      // 用于覆盖 Nuxt.js 默认的 vue-router 配置
  srcDir: '',      // 用于配置应用的源码目录路径，默认值为 rootDir 的值
  transition: {}   // 用于个性化配置应用过渡效果属性的默认值，
}
```

## 路由
Nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置。
### 基础路由
假设 pages 的目录结构如下：
```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```
那么，Nuxt.js 自动生成的路由配置如下：
``` javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```
### 动态路由
在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。

假设 pages 的目录结构如下：
```
pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue
```
Nuxt.js 生成对应的路由配置表为：
```javascript
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}
```

## 模板
定制化默认的 html 模板，只需要在应用根目录下创建一个 app.html 的文件。

默认模板为：
```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```
举个例子，可以修改模板添加 IE 的条件表达式：
```html
<!DOCTYPE html>
<!--[if IE 9]><html lang="en-US" class="lt-ie9 ie9" {{ HTML_ATTRS }}><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html {{ HTML_ATTRS }}><!--<![endif]-->
  <head>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

## 布局
Nuxt.js 允许我们扩展默认的布局，或在 layout 目录下创建自定义的布局。
### 默认布局
可通过添加 layouts/default.vue 文件来扩展应用的默认布局。需要在布局文件中添加 `<nuxt/>` 组件用于显示页面的主体内容。

默认布局的源码如下：
```html
<template>
  <nuxt/>
</template>
```
### 错误页面
通过编辑 layouts/error.vue 文件来定制化错误页面，这个布局文件不需要包含 `<nuxt/>` 标签。可以把这个布局文件当成是显示应用错误（404，500等）的组件。

举一个个性化错误页面的例子 layouts/error.vue:
```html
<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // 可以为错误页面指定自定义的布局
}
</script>
```

## 页面
页面组件实际上是 Vue 组件，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的功能特性）以便能快速开发通用应用。

Nuxt.js 为页面提供的特殊配置项：

| 属性名        |     描述     |
|  :--------:  | :----------|
| asyncData | 最重要的一个键, 支持异步数据处理，会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用,另外该方法的第一个参数为当前页面组件的上下文对象。Nuxt.js 会将asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件。|
| fetch | 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。 |
| head | 配置当前页面的 Meta 标签 |
| layout | 指定当前页面使用的布局（layouts 根目录下的布局文件） |
| loading | 如果设置为false，则阻止页面自动调用, |
| transition | 指定页面切换的过渡动效 |
| scrollToTop | 渲染页面前是否需要将当前页面滚动至顶部 |
| validate | 用于校验 动态路由的参数 |
| middleware | 指定页面的中间件，中间件会在页面渲染之前被调用 |