
fetch('/getList')
	.then(res => res.json())
	.then(list => {
		const listNode = document.getElementById('list')
		for (let el of list.data) {
			let liNode = document.createElement('li');
			liNode.innerHTML = el;
			listNode.appendChild(liNode);
		}
	})