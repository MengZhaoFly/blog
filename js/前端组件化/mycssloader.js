/**
css-loader 
import obj from 'xxx.css';
obj: [
  文件名
  文件内容
]
 */
const css = require('css');
const path = require('path');
module.exports = function (source) {
  const cssTree = css.parse(source)
  const nameSpace = path.parse(this.resourcePath).name;
  console.log('this.resourcePath', this.resourcePath, nameSpace)
  for (let rule of cssTree.stylesheet.rules) {
    rule.selectors = rule.selectors.map(selector => {
      // console.log('selector', selector)
      if (selector.startsWith(`.${nameSpace}`)) return selector;
      return `.${nameSpace} ${selector}`
    })
  }
  console.log(2222, css.stringify(cssTree))
  console.log(JSON.stringify(css.stringify(cssTree)))
  return `
  let styleNode = document.createElement('style');
  styleNode.innerHTML = ${JSON.stringify(css.stringify(cssTree))}
  document.head.appendChild(styleNode);
  `
}