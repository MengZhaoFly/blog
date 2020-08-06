import enableEvent from './lib/events';
export function createElement(Cls, attributes, ...children) {
  // console.log(arguments);
  let o;

  if (typeof Cls === 'string') {
    o = new Element(Cls);
  } else {
    o = new Cls({
      timer: null
    });
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }
  // 递归把子节点 渲染完成

  let visit = (children) => {
    for (let child of children) {

      if (child instanceof Array) {
        visit(child);
        continue;
      }

      if (typeof child === 'string') {
        child = new Text(child);
      }

      o.appendChild(child);
    }
  }

  visit(children);

  return o;
}

export class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Element {
  constructor(type) {  // config
    // console.log('Parent::config', config);
    this.children = [];
    this.root = document.createElement(type);
  }

  // set className (v) { // property
  //     console.log('Parent::className', v);
  // }

  setAttribute(name, value) {    // attribute
    // console.log('Parent::setAttribute', name, value);
    if (name.match(/^on([\s\S]+)$/)) {
      this.root.addEventListener(RegExp.$1.toLowerCase(), value);
      return;
    }
    this.root.setAttribute(name, value);
    if (name === 'enableEvent') {
      enableEvent(this.root);
    }
  }

  appendChild(child) {   // children
    // console.log('Parent::appendChild', child);
    this.children.push(child);
    // child.mountTo(this.root);    // 这里不要直接 moute
  }

  addEventListener() {
    this.root.addEventListener(...arguments);
  }

  get style() {
    return this.root.style;
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    if (this.children) {
      for (let child of this.children) {
        if (typeof child === 'string') {
          child = new Text(child);
        }
        child.mountTo(this.root);
      }
    }
    
  }
}