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
/******/ 	return __webpack_require__(__webpack_require__.s = "./4-main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./4-main.js":
/*!*******************!*\
  !*** ./4-main.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./createElement.js\");\n/* harmony import */ var _Carousel_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Carousel.view */ \"./Carousel.view\");\n\n\nlet component = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(_Carousel_view__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], {\n  class: \"carousel\",\n  data: [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]\n});\ncomponent.subTitle = 'i am sub title';\ncomponent.mountTo(document.body); // console.log(component);\n// component.id = 'a';\n// component.setAttribute('id', 'a');\n\n//# sourceURL=webpack:///./4-main.js?");

/***/ }),

/***/ "./Carousel.view":
/*!***********************!*\
  !*** ./Carousel.view ***!
  \***********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./createElement.js\");\n\n        \n        class Carousel {\n          constructor(config) {  // config\n            // console.log('Parent::config', config);\n            this.children = [];\n            this.attributes = new Map();\n            this.properties = new Map();\n          }\n        \n          mountTo(parent) {\n            this.render().mountTo(parent);\n          }\n          render() {\n            return Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {}, `\n    `,Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"h2\", {}, `hahahhaha`),`\n    `,Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {}, `\n      `,Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"p\", {}, `7777777`),`\n  `),`\n  `)\n          }\n          setAttribute(name, value) {    // attribute\n            // console.log('Parent::setAttribute', name, value);\n            // todo this.root.setAttribute(name, value);\n            // 这里将 attribute 存起来，在 render 中处理\n            this.attributes.set(name, value);\n            this[name] = value;\n            // this[name] = value;\n          }\n        }\n        \n\n//# sourceURL=webpack:///./Carousel.view?");

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