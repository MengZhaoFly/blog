import React, { Children } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from "react-dom";
// batchedUpdates  批处理更新
// batchedUpdates(() => {
// })
// batchedUpdates(() => {
// })
// batchedUpdates(() => {
// })
// unBatchedUpdate 非批处理
// ReactDOM.render()  => unBatchedUpdate  Sync
const { Component } = React;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  
  // 在执行这个事件的回调之前，先执行interactiveUpdates
  // isBateedUpdate = true
  // 还是走了批处理逻辑
  test(){
    this.setState({
      count: this.state.count + 1
    });
    console.log(this.state.count)
    this.setState({
      count: this.state.count + 1
    });
    console.log(this.state.count)
    setTimeout(() => {
      // 不在流程中
      console.log(this.state.count)
      this.setState({
        count: this.state.count + 1
      });
      // 5
      console.log(this.state.count)
    }, 0);
  }
  componentDidMount() {
    let me = this;
    // isBatchingUpdates = true , 
    // 在生命周期componentDidMount里，做了批处理的逻辑
    // 在批处理的逻辑里被丢弃了
    // me.setState({
    //   count: me.state.count + 1
    // });
    // console.log("第一次执行setState", me.state.count);
    // me.setState({
    //   count: me.state.count + 1
    // });
    // me.setState({
    //   count: me.state.count + 1
    // });
    me.setState({
      count: me.state.count + 1
    });
    // 只会保留最后一个 setState
    me.setState({
      count: me.state.count + 3
    });
    console.log("第二次执行setState", me.state.count);
    // 因为是宏任务的关系，执行时间实质上滞后了，isBatchingUpdates = false， 走到了Sync的；逻辑立即执行
    setTimeout(function () {
      console.log('setTimeout里开始前执行setState', me.state.count);
      me.setState({
        count: me.state.count + 1
      });
      me.setState({
        count: me.state.count + 1
      });
      me.setState({
        count: me.state.count + 1
      });
      // 2
      console.log('setTimeout里执行setState', me.state.count);
    }, 0);
    // isBatchdUpdate 如何产生的
    // 1. batchedUpdates方法的回调， isBatchdUpdate = true
    // 2. 用户交互的时候  isBatchdUpdate = true
    setTimeout(function () {
      batchedUpdates(() => {
        me.setState({
          count: me.state.count + 1  
        })
        me.setState({
          count: me.state.count + 1  
        })
        me.setState({
          count: me.state.count + 1  
        })
      })
      console.log('batchedUpdates里执行setState', me.state.count);
    }, 0);
    console.log('最后', me.state.count); 
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.test.bind(this)}>增加count</button>
      </div>
    );
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('app'))
// <APP>
//   <Modal>
//   </Model>
// </APP>
// ReactDOM.createPortal(Model, 'modal')
// <div id="app">

// </div>
// <div id="modal">

// </div>

// es-module  import: 代码静态分析的时候，就知道引入了哪些模块，tree shaking（优化打包：没使用的模块，不打包）也是依赖于 es-module
// 不好做懒加载
// es7 ~
// import clickModule from './drag.js'
// button.onclick = () => {
//   import('./drag.js').then(res => {
//     res.drag();
//   })
// }
// commonjs  执行
for () {
  const model = require('./a.js');
}

ref = 'refa'
ref = react.createRef();

// 纯函数：
<A a="a"/>
static getDerivedStateFromProps(props, state) {
  // 
  return {
    'statea': props.a
  }
}
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
// 进程  >  线程   >  纤程
// fiber: 纤程
react 15: stack reconciler
vnode:
{
  tag: 'div',
  id: 'app',
  children: [

  ]
} 
click:
dom diff: 找不同的地方，更新它
// 递归：一旦递归起来，不容易打断，等着我 diff 出结果出来，再去更新
// 一帧：16.6666 ms 60fps, 递归的过程比较长的话，页面卡了
// js 页面渲染 互斥
react 16: fiber reconciler (花了一年重构出来，)
// Render: 计算我们的页面哪些地方需要更新。
// 有更高优先级的任务（用户的click，输入）插进来，这使得任务可以中断，而且还能再次调起
// 操作系统：FCFS（先来先服务），（合作调度）
// js 线程  <-> 页面渲染, 为了用户的体验，达成协议，
// Commit：已经计算完了
// 把这些更新应用的页面上：不可中断的。
// 理论
```js
while(true) {}
btn.click = function() {
  consloe.log(1)  //
}
```

15 lifeCycle vs 16 