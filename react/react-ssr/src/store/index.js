import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer/index';
import clientAxios from '../client/request';
import serverAxios from '../server/request';

// 假如果 这样导出 每一个 store 都是一样的 单例的 应该每一个用户创建一次
// const store = createStore(reducer, applyMiddleware(thunk));

export const getStore = (req) => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))));
}

export const getClientStore = () => {
  // 服务端 初始化的 数据
  const defaultStore = window.context.state;
  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}
