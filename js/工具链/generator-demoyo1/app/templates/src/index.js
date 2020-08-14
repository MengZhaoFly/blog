import React from 'react';
import ReactDOM from 'react-dom';
import { zip } from 'lodash-es';
import './index.css';
import App from './App';
console.log(zip([[1, 2], [3, 4]]))
ReactDOM.render(<App />, document.getElementById('root'));

