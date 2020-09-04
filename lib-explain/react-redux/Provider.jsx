import React, { Component } from 'react';
import { Provider, Consumer }  from './Context';
class EnhancedProvider extends Component {
  constructor(props) {
    super(props);
    const { store } = props;
    if (store == null) {
      throw new Error(`Store should not omit in <Provider/>`);
    }
    this.state = {    // 得到当前的state
      state: store.getState(),
      dispatch: store.dispatch,
    }
    store.subscribe(() => {      // 单纯的store.getState函数是不变的，需要得到其结果state才能触发组件更新。
      this.setState({ state: store.getState() });
    })
  }
  render() {
    return (
      <Provider value={ this.state }>
        { this.props.children }
      </Provider>
    );
  }
}

export default EnhancedProvider;