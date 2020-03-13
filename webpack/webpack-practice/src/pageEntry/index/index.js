import React from 'react';
import ReactDOM from 'react-dom';
// import common from '../../common/index';
import '../../css/name.css'
// console.log(common(1))

import App from './App';


ReactDOM.render(
	<div className="box">
		<App />
	</div> ,
	document.getElementById('app')
);

// koa
router.get('*', () => {
	ctx.render('index.html');
	// js 接管 url
})
// nginx