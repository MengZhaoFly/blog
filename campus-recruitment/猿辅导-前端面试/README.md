[](https://www.nowcoder.com/discuss/349728?type=2&order=0&pos=29&page=1)
## 小程序原理

[小程序简介](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%AE%80%E4%BB%8B)
[渲染层和逻辑层](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/framework.html#%E6%B8%B2%E6%9F%93%E5%B1%82%E5%92%8C%E9%80%BB%E8%BE%91%E5%B1%82)

## webpack
- 初始化参数：配置文件 、 Shell 语句
  config.js
  webpack-dev-server --mode production
- 确定入口：根据配置中的 entry 找出所有的入口文件；
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
a.js

```js
import b.css
```
- 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk（指一个代码块，module的集合），再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

[Webpack原理与实践（一）：打包流程](https://juejin.im/post/5be9297351882516f5786404)

### tree-shaking
tree-shaking： 帮我们不打包那些永远不会被运行的代码

a.js export   {add, sub}
b.js import {add} from 'a.js'

重点：**es-module 代码静态分析的时候就够 确定哪些模块被引入，哪些模块没有**
common.js 只有在代码运行的时候才能够确定

## 算法
[102. 二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
[2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)