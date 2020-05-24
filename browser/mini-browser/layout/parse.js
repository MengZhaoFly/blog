const css = require('css')
const fs = require('fs')
const images = require('images')
const { match } = require('./match');
const layout = require('./layout');
const render = require('./render');

let htmlStr = `
<html>
<head>
    <style>
    #myid{
      width:500px;
      display: flex;
      background-color: rgb(0, 0, 255);
      align-items: center;
      height: 500px;
      justify-content: center;
      flex-direction: row;
    }
    .main {
      width: 200px;
      height: 100px;
      background-color: rgb(255, 0, 0);
    }
    .side {
      width: 200px;
      height: 200px;
      background-color: rgb(0, 255, 0);
    }
    </style>
</head>
<body>
    <div id="myid">
      <div class="main"></div>
      <div class="side"></div>
    </div>
</body>
</html>
`
// 正则表达式：实现 就是 状态机
// KMP：     indexOf   
// htmlStr = `<img id="myid"/>`
// htmlStr = `<div class="abc" id="wrap"><img id="myid"/></div>`
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [
  { type: 'document', children: []}
]

let rules = [];
function addCssRules(text) {
  let ast = css.parse(text);
  rules.push(...ast.stylesheet.rules)
}
function computerCss(element) {
  let elements = stack.slice(0).reverse();
  if (!element.computerStyle) {
    element.computerStyle = {};
  }
  // 从所有 rules 里面找到 符合该 选择器的 rule 添加到 该元素身上
  // rules: [body div #myid, body div img]
  // element: div
  // css 选择器 从后往前选
  for (let rule of rules) {
    let selectorParts = rule.selectors[0].split(' ').reverse();
    // 看选择器最后一部风能不能命中，不能 说明这个选择器 都不能
    if (!match(element, selectorParts[0])) {
      // 
      continue;
    }
    // 否则 看 在 父元素 和 剩下的选择器 中 一次匹配
    let j = 1;
    for (let i = 0; i < elements.length; i ++) {
      if (match(elements[i], selectorParts[j])) {
        j ++;
      }
    }
    // 匹配
    if (j >= selectorParts.length) {
      // console.log(element, '--', rule);
      let computerStyle = element.computerStyle;
      for (let declaration of rule.declarations) {
        let { property, value} = declaration;
        if (!computerStyle[property]) {
          computerStyle[property] = {};
        }
        computerStyle[property].value = declaration.value;
      }
    }
  }
}
const EOF = Symbol('EOF');

function emit(token) {
  let top = stack[stack.length - 1];
  if (token.type == 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: token.attributes
    }
    element.tagName = token.tagName;
    // 理论上（最佳实践） 一个 element 生成的时候 css 已经分析完成
    computerCss(element)
    top.children.push(element);
    if (token.isSelfClosing) {
      // 自封闭 不需要入栈进行配对
      return;
    };
    stack.push(element);
    // start tag，一个全新的 Text
    currentTextNode = null;
  } else if (token.type == 'endTag') {
    
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end does't match!");
    } else {
      if (top.tagName === 'style') {
        addCssRules(top.children[0].content);
      }
      // 因为 计算排版需要知道子元素
      layout(top);
      stack.pop();
    }
    // end tag, 也是 一个全新的 Text
    currentTextNode = null;
  } else if (token.type == 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      // 当前这个 currentTextNode 就是栈顶元素的 子节点
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content
  }
}
function data(c) {
  if (c == '<') {
    return tagOpen;
  }else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}
// < 的下一个状态：两个可能 1：/ 视为闭合标签 2：字母 视为标签名
function tagOpen(c) {
  if (c == '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      attributes: [],
      tagName: ''
    }
    return tagName(c);
  }
}
// 闭合标签 生成 token 交给 tagName
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c);
  }
}
// 不管是 开始tag、还是结束tag，都会进入该状态
// 遇到 whiteSpace 处理属性
// 遇到 字母 拼接 token
// 遇到 结束符 emit token <div>
function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName
  } else if (c === '>') {
    emit(currentToken);
    return data;
  }
}
// 处理 Attribute 略
// 遇到 / 自封闭
// 遇到 > 该标签结束
// 遇到 whiteSpace 循环处理属性
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c == '>') {
    emit(currentToken)
    return data;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute = {
      name: c,
      value: ''
    }
    return attributeName;
  } else {
    return beforeAttributeName;
  }
}
/**
 * 1: 合格 拼接自己的 attributeName
   2: = 处理属性
 */
function attributeName(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute.name += c;
    return attributeName;
  } else if (c === '=') {
    return attributeValue
  }
}
/**
 * 1: 合格 拼接自己的 attributeValue
   2: = 处理属性
 */
function attributeValue(c) {
  if (c === "\"" || c === "\"") {
    return attributeValue
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentAttribute.value += c;
    return attributeValue;
  } else {
    // 处理完一个属性
    currentToken.attributes.push(currentAttribute);
    currentAttribute = null;
    // <div class="abc"> 处理完 attributeValue 消耗一个 字符
    return beforeAttributeName(c);
  }
}
function selfClosingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken)
    return data;
  }
}
function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  // state = state(EOF);
}
parseHTML(htmlStr);
const dom = stack[0];
// console.log(JSON.stringify(dom, null, 2));
fs.writeFileSync('./dom.json', JSON.stringify(dom, null, 2));
const viewport = images(800, 600);
render(viewport, dom);
viewport.save('output.jpg');
module.exports = {
  parseHTML
}