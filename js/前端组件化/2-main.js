// 每个标签、组件 都是 createElement 转换的结果
function createElement(Cls, attributes, ...children) {
	console.log('当前标签', Cls, attributes,children)
	let o;

	if (typeof Cls === "string") {
		o = new Element(Cls);
	} else {
		o = new Cls({
			timer: {}
		});
	}
	for (let name in attributes) {
		o.setAttribute(name, attributes[name]);
	}

	//console.log(children);
	// console.log(o);
	for (let child of children) {
		if (typeof child === "string")
			child = new Text(child);

		o.appendChild(child);
	}
	console.log(o)
	return o;
}
// 处理文本
class Text {
	constructor(text) {
		this.children = [];
		this.root = document.createTextNode(text);
	}
	mountTo(parent) {
		parent.appendChild(this.root);
	}
}
// 处理普通 html tag
class Element {
	constructor(type) {
		this.children = [];
		this.root = document.createElement(type);
	}

	setAttribute(name, value) { //attribute
		this.root.setAttribute(name, value);
	}

	appendChild(child) {
		this.children.push(child);
	}
	// 当前节点this.root挂载到某个容器 
	// 如果存在子节点 子节点会把 this.root 作为父容器 继续挂载
	mountTo(parent) {
		parent.appendChild(this.root);
		for (let child of this.children) {
			child.mountTo(this.root);
		}
	}

}

class MyComponent {
	constructor(config) {
		this.children = [];
	}

	setAttribute(name, value) { //attribute
		this.root.setAttribute(name, value);
	}

	appendChild(child) {
		this.children.push(child);
	}

	render() {
		return <article>
			<header>I'm a header</header>
			{/* this.slot 插槽 类似 react的 childRen */}
			{this.slot}
			<footer>I'm a footer</footer>
		</article>
	}

	mountTo(parent) {
		this.slot = <div></div>
		for (let child of this.children) {
			this.slot.appendChild(child)
		}
		this.render().mountTo(parent)
	}


}


// let component = <div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
//         <div></div>
//         <p></p>
//         <div></div>
//         <div></div>
//     </div>

let component = <MyComponent>
	<div>text text text</div>
</MyComponent>



component.mountTo(document.body);
/*
var component = createElement(
    Parent, 
    {
        id: "a",
        "class": "b"
    }, 
    createElement(Child, null), 
    createElement(Child, null), 
    createElement(Child, null)
);
*/

console.log(component);

//componet.setAttribute("id", "a");