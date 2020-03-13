import React, { useState } from 'react';
// import common from '';
// console.log()
import str from './dynamic-import.js'

class App extends React.Component {
	handleClick() {
		console.log(str);
		throw new Error('123');
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