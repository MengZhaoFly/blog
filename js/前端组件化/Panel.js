import { createElement, Text, Element } from './createElement.js';
import './panel.css';
class TabPanel {
  constructor(config) {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.title = 'fake title';
  }

  setAttribute(name, value) {    // attribute
    this.attributes.set(name, value);
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  set subTitle(value) {
    this.properties.set('subTitle', value);
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
  select(i) {
    for (let view of this.childrenView) {
      view.display = 'none';
    }
    this.childrenView[i].style.display = '';
    this.titleView.innerText = '';
  }
  render() {
    this.childrenView = this.children.map((child) => {
      return (
        <div className="child">
          { child }
        </div>
      )
    })
    this.titleView = <h1>{ this.title }</h1>
    return (
      <div className="panel">
        { this.titleView }
        <div>
        {
          this.childrenView
        }
        </div>
      </div>
    )
  }
}

let panel = <TabPanel>
  <span title="p1">this panel 1</span>
  <span title="p2">this panel 2</span>
  <span title="p3">this panel 3</span>
  <span title="p4">this panel 4</span>
</TabPanel>

panel.mountTo(document.body);