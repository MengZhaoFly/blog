import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './request';

const pageChange = function () {
  // 上报访问记录
  console.log('上报访问记录');
}

// 判断浏览器是否支持History API
if (window.history.pushState) {
  console.log(123)
  // replaceState和pushState不会触发popstate事件
  let hooks = ['replaceState', 'pushState'];
  hooks.forEach(function (hook) {
    let method = window.history[hook];
    window.history[hook] = function (...args) {
      setTimeout(pageChange, 0); // 路由变化之后再上报
      return method.apply(window.history, args);
    };
  });
  window.addEventListener('popstate', pageChange, true);
} else {
  window.addEventListener('hashchange', pageChange, true);
}
// 
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
