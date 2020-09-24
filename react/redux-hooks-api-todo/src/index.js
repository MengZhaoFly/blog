import React, { Component, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// o(100)
// {a: b : {c: { d: 1 }}}  
// a.b.c.d = 2    
// let obj = {...obj};
// obj.a.b.c.d = 2
// {a: b : {c: { d: 2 }}}
// React.memo      props
// PureComponent state props
class XXX extends PureComponent {
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// currentMode
// lengecyMode
/**
<div id="root">
  main
  <header>
  </header>
  <footer>
  </footer>
</div>
<div id="alert">弹框</div>

// class Port {

// }
<Port> children </Port>


 */


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
