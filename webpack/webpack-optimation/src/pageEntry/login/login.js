import React from 'react';
import ReactDOM from 'react-dom';
import common from '../../common/index';

console.log(common(3))
const Login = () => {
	const handleClick = () => {
		import('../../common/index').then(e => {
			console.log('click');
		})
	}
	return (
		<div onClick={handleClick}>login</div>
	)
}
ReactDOM.render(
	<Login />,
	document.getElementById('app')
);