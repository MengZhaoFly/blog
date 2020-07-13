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
/******/ 	return __webpack_require__(__webpack_require__.s = "./3-main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./3-main.js":
/*!*******************!*\
  !*** ./3-main.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./createElement.js\");\n\n\nclass Carousel {\n  constructor(config) {\n    // config\n    // console.log('Parent::config', config);\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n  } // set className (v) { // property\n  //     console.log('Parent::className', v);\n  // }\n\n\n  setAttribute(name, value) {\n    // attribute\n    // console.log('Parent::setAttribute', name, value);\n    // todo this.root.setAttribute(name, value);\n    // 这里将 attribute 存起来，在 render 中处理\n    this.attributes.set(name, value);\n    this[name] = value; // this[name] = value;\n  }\n\n  appendChild(child) {\n    // children\n    // console.log('Parent::appendChild', child);\n    this.children.push(child); // child.mountTo(this.root);    // 这里不要直接 moute\n  }\n\n  set subTitle(value) {\n    this.properties.set('subTitle', value);\n  }\n\n  mountTo(parent) {\n    this.render().mountTo(parent);\n  }\n\n  render() {\n    let children = this.attributes.get('data').map(url => {\n      let element = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"img\", {\n        src: url\n      }); // 禁用拖拽\n\n      element.addEventListener('dragstart', event => event.preventDefault());\n      return element;\n    });\n    let root = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n      class: this.attributes.get('class')\n    }, children);\n    let positon = 0; // 两个一组 做移动\n\n    let nextPic = () => {\n      // 下一张图片索引\n      let nextPositon = (positon + 1) % this.data.length;\n      let current = children[positon];\n      let next = children[nextPositon];\n      console.log(current, next); // 移到起点 不需要动画 瞬间完成\n\n      current.style.transition = 'none';\n      next.style.transition = 'none'; // 动画：图片的起始位置\n\n      current.style.transform = `translateX(${-100 * positon}%)`; // 0\n\n      next.style.transform = `translateX(${100 - 100 * nextPositon}%)`; // 1\n      // 执行完这些代码，浏览器会在下一帧让其生效\n      // transition 生效需要间隔，所以需要用 setTimeout，setTimeout 动画生效\n\n      setTimeout(() => {\n        // 从起点到终点 就需要动画了\n        current.style.transition = ''; // = '' means use css\n\n        next.style.transition = ''; // 动画：图片的终止位置\n\n        current.style.transform = `translateX(${-100 - 100 * positon}%)`; // -1 位置\n\n        next.style.transform = `translateX(${-100 * nextPositon}%)`; // 0 的位置\n\n        positon = nextPositon;\n      }, 16); // 16 = 0, 16 更保险一点, 1000 / 60 = 1 帧的时间\n      // todo ???\n      // requestAnimationFrame(function() {\n      //     // 上一块 DOM 操作在浏览器生效\n      //     requestAnimationFrame(function() {\n      //         current.style.transition = 'ease 0s';\n      //         next.style.transition = 'ease 0s';\n      //         current.style.transform = `translateX(${-100-100 * positon}%)`;\n      //         next.style.transform = `translateX(${-100 * nextPositon}%)`;\n      //         positon = nextPositon;\n      //     });\n      // });\n    }; // setInterval(nextPic, 3000);\n\n\n    root.addEventListener('mousedown', event => {\n      // 滑动需要 【前一张图片 当前这张图片 下一张图片】 相互配合完成\n      let startX = event.clientX,\n          startY = event.clientY; // 处理负值\n\n      let lastPosition = (positon - 1 + this.data.length) % this.data.length;\n      let nextPositon = (positon + 1) % this.data.length;\n      let current = children[positon];\n      let last = children[lastPosition];\n      let next = children[nextPositon];\n      current.style.transition = 'none';\n      last.style.transition = 'none';\n      next.style.transition = 'none'; // 0 0px 1 -500px  2 -1000px 以此类推\n\n      current.style.transform = `translateX(${-500 * positon}px)`; // 当前图片的正确的位置\n\n      last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`; // 前一个\n\n      next.style.transform = `translateX(${500 - 500 * nextPositon}px)`; // 后一个\n\n      let move = event => {\n        current.style.transform = `translateX(${event.clientX - startX - 500 * positon}px)`;\n        last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;\n        next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPositon}px)`; // console.log(event.clientX - startX, event.clientY - startY);\n      };\n\n      let up = event => {\n        // 抬手 判断 \n        // 到底下一张还是上一张\n        let offset = 0;\n\n        if (event.clientX - startX > 250) {\n          offset = 1;\n        } else if (event.clientX - startX < -250) {\n          offset = -1;\n        }\n\n        current.style.transition = 'ease 0.2s';\n        last.style.transition = 'ease 0.2s';\n        next.style.transition = 'ease 0.2s';\n        current.style.transform = `translateX(${offset * 500 - 500 * positon}px)`;\n        last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;\n        next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPositon}px)`; // offset 负值 为 左滑\n\n        positon = (positon - offset + this.data.length) % this.data.length; // baseX = baseX + event.clientX - startX, baseY = baseY + event.clientY - startY;\n\n        document.removeEventListener('mousemove', move);\n        document.removeEventListener('mouseup', up);\n      }; // 监听在 document 上的事件，即使移到浏览器的外面也会触发\n\n\n      document.addEventListener('mousemove', move);\n      document.addEventListener('mouseup', up);\n    });\n    return root;\n  }\n\n}\n\nlet component = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(Carousel, {\n  class: \"carousel\",\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.subTitle = 'i am sub title';\ncomponent.mountTo(document.body); // console.log(component);\n// component.id = 'a';\n// component.setAttribute('id', 'a');\n\n//# sourceURL=webpack:///./3-main.js?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Element\", function() { return Element; });\nfunction createElement(Cls, attributes, ...children) {\n  // console.log(arguments);\n  let o;\n\n  if (typeof Cls === 'string') {\n    o = new Element(Cls);\n  } else {\n    o = new Cls({\n      timer: null\n    });\n  }\n\n  for (let name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  } // 递归把子节点 渲染完成\n\n\n  let visit = children => {\n    for (let child of children) {\n      if (child instanceof Array) {\n        visit(child);\n        continue;\n      }\n\n      if (typeof child === 'string') {\n        child = new Text(child);\n      }\n\n      o.appendChild(child);\n    }\n  };\n\n  visit(children);\n  return o;\n}\nclass Text {\n  constructor(text) {\n    this.root = document.createTextNode(text);\n  }\n\n  mountTo(parent) {\n    parent.appendChild(this.root);\n  }\n\n}\nclass Element {\n  constructor(type) {\n    // config\n    // console.log('Parent::config', config);\n    this.children = [];\n    this.root = document.createElement(type);\n  } // set className (v) { // property\n  //     console.log('Parent::className', v);\n  // }\n\n\n  setAttribute(name, value) {\n    // attribute\n    // console.log('Parent::setAttribute', name, value);\n    this.root.setAttribute(name, value);\n  }\n\n  appendChild(child) {\n    // children\n    // console.log('Parent::appendChild', child);\n    this.children.push(child); // child.mountTo(this.root);    // 这里不要直接 moute\n  }\n\n  addEventListener() {\n    this.root.addEventListener(...arguments);\n  }\n\n  get style() {\n    return this.root.style;\n  }\n\n  mountTo(parent) {\n    parent.appendChild(this.root);\n\n    for (let child of this.children) {\n      if (typeof child === 'string') {\n        child = new Text(child);\n      }\n\n      child.mountTo(this.root);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ })

/******/ });