## O(n ^ 3)
Prev                  Last
          A                     A  
         / \                   / \
        /   \                 /   \
       B     D     ====>     D     B
      /                             \
     C                               C

就上面两树的变化而言，若要达到最小更新，首先要对比每个节点是否相同，也就是：

PA->LA
PA->LB
PA->LC
PA->LD
PB->LA
...
查找不同就需要O(n^2)
找到差异后还要计算最小转换方式，最终结果为O(n^3)
参考：https://www.zhihu.com/question/66851503

## React的Diff算法
### 对比不同类型的元素
当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树：
举个例子，当一个元素从 
1. <a> 变成 <img>，
2. <Article> 变成 <Comment>，
3. <Button> 变成 <div> 
都会触发一个完整的重建流程。

**在根节点以下的组件也会被卸载，它们的状态会被销毁。** 比如，当比对以下更变时：
从 div =》span
```html
<div>
  <Counter />
</div>
<span>
  <Counter />
</span>
```
### 对比同一类型的元素
当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。比如：

<div className="before" title="stuff" />
<div className="after" title="stuff" />

### 对子节点进行递归
```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
现在 React 知道只有带着 '2014' key 的元素是新元素，带着 '2015' 以及 '2016' key 的元素仅仅移动了。