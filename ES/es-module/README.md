import 只能作为模块顶层的语句出现，不能出现在 function 里面或是 if 里面。
import 的模块名只能是字符串常量。
不管 import 的语句出现的位置在哪里，在模块初始化的时候所有的 import 都必须已经导入完成。
import binding 是 immutable 的，类似 const。比如说你不能 import { a } from ‘./a’ 然后给 a 赋值个其他什么东西。




参考 牛逼的秋风：https://juejin.im/post/5e4963f451882548fd305644#heading-7