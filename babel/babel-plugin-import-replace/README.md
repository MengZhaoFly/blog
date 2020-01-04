## specifier中的imported和local字段
```js
import { Ajax } from '../lib/utils';
```
imported表示从导出模块导出的变量，local表示导入后当前模块的变量
imported: Ajax
local: Ajax
```js
import { Ajax as ajax } from '../lib/utils';
```
imported: Ajax
local: ajax
如果不使用as关键字，那么imported和local就是表示同一个变量的节点了

## 函数参数
### （Path, state）
###  Path
每次访问节点方法时，都会传入一个path参数，这个path参数中包含了节点的信息以及节点和所在的位置，以供对特定节点进行操作
```js
── 属性      
  - node   当前节点
  - parent  父节点
  - parentPath 父path
  - scope   作用域
  - context  上下文
  - ...
── 方法
  - get   当前节点
  - findParent  向父节点搜寻节点
  - getSibling 获取兄弟节点
  - replaceWith  用AST节点替换该节点
  - replaceWithMultiple 用多个AST节点替换该节点
  - insertBefore  在节点前插入节点
  - insertAfter 在节点后插入节点
  - remove   删除节点
  - ...
```
### state
state就是一系列状态的集合，包含诸如当前plugin的信息、plugin传入的配置参数信息

## babel 相关工具
Babylon 是 Babel的解析器
babel-traverse 用于维护操作AST的状态，定义了更新、添加和移除节点的操作方法
babel-types 是一个强大的用于处理AST节点的工具库，“它包含了构造、验证以及变换AST节点的方法

```js
import { Ajax } from '../lib/utils';
import utils from '../lib/utils';
import * as utils from '../lib/utils';
// 分别叫做ImportSpecifier、ImportDefaultSpecifier和ImportNamespaceSpecifier
```


## 
[babel手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-stages-of-babel)
[Babylon AST node types文档](https://github.com/babel/babylon/blob/master/ast/spec.md#importspecifier)
[babel-types文档](https://www.babeljs.cn/docs/babel-types#importdeclaration)
[其他案列](https://zhuanlan.zhihu.com/p/72995336)

