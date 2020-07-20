const parse5 = require('parse5');
const { DomHandler } = require("domhandler");
const htmlparser2 = require("htmlparser2");
module.exports = function (source) {
  return new Promise((resolve, reject) => {
    const handler = new DomHandler(function (error, dom) {
      if (error) {
        // Handle error
        reject(error);
      } else {
        // console.log(dom);
        // js
        // console.log(dom[2].children[0].data);
        function visit(parentNode) {
          console.log(parentNode);
          if (!parentNode) return ''
          let children = []
          if (parentNode.children) {
            function help(children) {
              if (!children) return ''
              return children.map(child => {
                if (child.type === 'text') {
                  return `\`${child.data}\``;
                } else if (child.type === 'tag') {
                  return `createElement("${child.name}", ${JSON.stringify(child.attribs)}, ${help(child.children).join(',')})`
                }
              })
            }
            children = help(parentNode.children)
          }
          return `createElement("${parentNode.name}", ${JSON.stringify(parentNode.attribs)}, ${children.join(',')})`
        }
        resolve(`
        import { createElement, Text, Wrapper } from './createElement.js';
        export class Carousel {
          constructor(config) {  // config
            // console.log('Parent::config', config);
            this.children = [];
            this.attributes = new Map();
            this.properties = new Map();
          }
        
          mountTo(parent) {
            this.render().mountTo(parent);
          }
          render() {
            return ${visit(dom[0].children.find(e => e.type === 'tag'))}
          }
          setAttribute(name, value) {    // attribute
            // console.log('Parent::setAttribute', name, value);
            // todo this.root.setAttribute(name, value);
            // 这里将 attribute 存起来，在 render 中处理
            this.attributes.set(name, value);
            this[name] = value;
            // this[name] = value;
          }
        }
        `)
      }
    });
    const parser = new htmlparser2.Parser(handler);
    parser.write(source);
    parser.end();
  })
}