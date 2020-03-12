import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
// import common from '';
// console.log()

class App extends React.Component {
	handleClick() {
		import('./dynamic-import.js').then(e => {
			console.log('click');
			throw new Error('error');
		})
	}
	render () {
		return (
			<div onClick={this.handleClick.bind(this)}>
				hello webpack, hahaha,swjwl
			</div>
		)
	}
}

export default App;
// export default App;