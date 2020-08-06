/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Panel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Panel.js":
/*!******************!*\
  !*** ./Panel.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./createElement.js\");\n/* harmony import */ var _panel_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel.css */ \"./panel.css\");\n/* harmony import */ var _panel_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_panel_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nclass TabPanel {\n  constructor(config) {\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n    this.title = 'fake title';\n  }\n\n  setAttribute(name, value) {\n    // attribute\n    this.attributes.set(name, value);\n    this[name] = value;\n  }\n\n  appendChild(child) {\n    this.children.push(child);\n  }\n\n  set subTitle(value) {\n    this.properties.set('subTitle', value);\n  }\n\n  mountTo(parent) {\n    this.render().mountTo(parent);\n  }\n\n  select(i) {\n    for (let view of this.childrenView) {\n      view.display = 'none';\n    }\n\n    this.childrenView[i].style.display = '';\n    this.titleView.innerText = '';\n  }\n\n  render() {\n    this.childrenView = this.children.map(child => {\n      return Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n        className: \"child\"\n      }, child);\n    });\n    this.titleView = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"h1\", null, this.title);\n    return Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n      className: \"panel\"\n    }, this.titleView, Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", null, this.childrenView));\n  }\n\n}\n\nlet panel = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(TabPanel, null, Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"span\", {\n  title: \"p1\"\n}, \"this panel 1\"), Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"span\", {\n  title: \"p2\"\n}, \"this panel 2\"), Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"span\", {\n  title: \"p3\"\n}, \"this panel 3\"), Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"span\", {\n  title: \"p4\"\n}, \"this panel 4\"));\npanel.mountTo(document.body);\n\n//# sourceURL=webpack:///./Panel.js?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Element\", function() { return Element; });\n/* harmony import */ var _lib_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/events */ \"./lib/events.js\");\n\nfunction createElement(Cls, attributes, ...children) {\n  // console.log(arguments);\n  let o;\n\n  if (typeof Cls === 'string') {\n    o = new Element(Cls);\n  } else {\n    o = new Cls({\n      timer: null\n    });\n  }\n\n  for (let name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  } // 递归把子节点 渲染完成\n\n\n  let visit = children => {\n    for (let child of children) {\n      if (child instanceof Array) {\n        visit(child);\n        continue;\n      }\n\n      if (typeof child === 'string') {\n        child = new Text(child);\n      }\n\n      o.appendChild(child);\n    }\n  };\n\n  visit(children);\n  return o;\n}\nclass Text {\n  constructor(text) {\n    this.root = document.createTextNode(text);\n  }\n\n  mountTo(parent) {\n    parent.appendChild(this.root);\n  }\n\n}\nclass Element {\n  constructor(type) {\n    // config\n    // console.log('Parent::config', config);\n    this.children = [];\n    this.root = document.createElement(type);\n  } // set className (v) { // property\n  //     console.log('Parent::className', v);\n  // }\n\n\n  setAttribute(name, value) {\n    // attribute\n    // console.log('Parent::setAttribute', name, value);\n    if (name.match(/^on([\\s\\S]+)$/)) {\n      this.root.addEventListener(RegExp.$1.toLowerCase(), value);\n      return;\n    }\n\n    this.root.setAttribute(name, value);\n\n    if (name === 'enableEvent') {\n      Object(_lib_events__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.root);\n    }\n  }\n\n  appendChild(child) {\n    // children\n    // console.log('Parent::appendChild', child);\n    this.children.push(child); // child.mountTo(this.root);    // 这里不要直接 moute\n  }\n\n  addEventListener() {\n    this.root.addEventListener(...arguments);\n  }\n\n  get style() {\n    return this.root.style;\n  }\n\n  mountTo(parent) {\n    parent.appendChild(this.root);\n\n    if (this.children) {\n      for (let child of this.children) {\n        if (typeof child === 'string') {\n          child = new Text(child);\n        }\n\n        child.mountTo(this.root);\n      }\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./lib/events.js":
/*!***********************!*\
  !*** ./lib/events.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return enableEvent; });\n// let element = document.body;\n// enableEvent();\nfunction enableEvent(element) {\n  let contexts = Object.create(null);\n  let MOUSE_SYMBOL = Symbol('mouse'); // pc undefined\n  // mobile null\n\n  if (element.ontouchstart !== null) {\n    element.addEventListener('mousedown', event => {\n      contexts[MOUSE_SYMBOL] = Object.create(null);\n      start(event, contexts[MOUSE_SYMBOL]);\n\n      let mousemove = event => {\n        move(event, contexts[MOUSE_SYMBOL]);\n      };\n\n      let mouseend = event => {\n        end(event, contexts[MOUSE_SYMBOL]);\n        document.removeEventListener('mousemove', mousemove);\n        document.removeEventListener('mouseup', mouseend);\n      };\n\n      document.addEventListener('mousemove', mousemove);\n      document.addEventListener('mouseup', mouseend);\n    });\n  }\n\n  element.addEventListener('touchstart', event => {\n    for (let touch of event.changedTouches) {\n      contexts[touch.identifier] = Object.create(null);\n      start(touch, contexts[touch.identifier]);\n    }\n  });\n  element.addEventListener('touchmove', event => {\n    for (let touch of event.changedTouches) {\n      move(touch, contexts[touch.identifier]);\n    }\n  });\n  element.addEventListener('touchend', event => {\n    for (let touch of event.changedTouches) {\n      end(touch, contexts[touch.identifier]);\n    }\n  }); // 系统事件进来：弹窗\n\n  element.addEventListener('touchcancel', event => {\n    for (let touch of event.changedTouches) {\n      cancel(touch, contexts[touch.identifier]);\n      delete contexts[touch.identifier];\n    }\n  }); // tap\n  // pan panstart panmove panend\n  // flick 快速扫过\n  // press pressstart pressend\n\n  function start(point, contexts) {\n    contexts.startX = point.clientX;\n    contexts.startY = point.clientY;\n    contexts.moves = [];\n    contexts.isTap = true;\n    contexts.isPan = false;\n    contexts.isPress = false;\n    contexts.timeoutHandler = setTimeout(() => {\n      // 500 之后发现 还要考虑是不是滑动事件\n      if (contexts.isPan) {\n        return;\n      } // 不滑动 就是 press\n\n\n      contexts.isTap = false;\n      contexts.isPan = false;\n      contexts.isPress = true;\n    }, 500);\n  }\n\n  function move(point, contexts) {\n    let dx = point.clientX - contexts.startX,\n        dy = point.clientY - contexts.startY; // 如果移动了 10px 且之前 没有 pan 过 就是 panStart\n\n    if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {\n      contexts.isTap = false;\n      contexts.isPan = true;\n      contexts.isPress = false;\n      console.log('panStart');\n      let e = new CustomEvent('panstart');\n      element.dispatchEvent(e);\n    } // \n\n\n    if (contexts.isPan) {\n      contexts.moves.push({\n        dx,\n        dy,\n        t: Date.now()\n      }); // 只要 最后 300ms 的移动距离\n\n      contexts.moves = contexts.moves.filter(r => Date.now() - r.t < 300);\n      let e = new CustomEvent('pan', {\n        detail: {\n          startX: contexts.startX,\n          startY: contexts.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      });\n      element.dispatchEvent(e);\n    }\n  }\n\n  function end(point, contexts) {\n    if (contexts.isPan) {\n      console.log('panend');\n      let e = new CustomEvent('panend', {\n        detail: {\n          startX: contexts.startX,\n          startY: contexts.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      });\n      element.dispatchEvent(e);\n    }\n\n    if (contexts.isTap) console.log('tap');\n    if (contexts.isPress) console.log('isPress');\n\n    if (contexts.isPan) {\n      // 最后一次距离\n      let dx = point.clientX - contexts.startX,\n          dy = point.clientY - contexts.startY; // 最早的一次的 距离\n\n      let record = contexts.moves[0]; // 最早的一次距离和最后的一次距离之差 / 时间\n\n      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);\n      let isFlick = speed > 2.5;\n\n      if (isFlick) {\n        console.log('flick');\n      }\n    } // 抬手 clear\n\n\n    clearTimeout(contexts.timeoutHandler);\n  }\n\n  function cancel() {}\n}\n\n//# sourceURL=webpack:///./lib/events.js?");

/***/ }),

/***/ "./panel.css":
/*!*******************!*\
  !*** ./panel.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n  let styleNode = document.createElement('style');\n  styleNode.innerHTML = \".panel .child {\\n  width: 300px;\\n  min-height: 300px;\\n}\\n\\n.panel * {\\n  background-color: red;\\n}\"\n  document.head.appendChild(styleNode);\n  \n\n//# sourceURL=webpack:///./panel.css?");

/***/ })

/******/ });