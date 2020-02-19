import React from 'react';
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