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
/******/ 	return __webpack_require__(__webpack_require__.s = "./5-end-version.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./5-end-version.js":
/*!**************************!*\
  !*** ./5-end-version.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement.js */ \"./createElement.js\");\n/* harmony import */ var _lib_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/animation */ \"./lib/animation.js\");\n/* harmony import */ var _lib_cub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/cub */ \"./lib/cub.js\");\n/* harmony import */ var _lib_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/events */ \"./lib/events.js\");\n\n\n\n\n\nclass Carousel {\n  constructor(config) {\n    // config\n    // console.log('Parent::config', config);\n    this.children = [];\n    this.attributes = new Map();\n    this.properties = new Map();\n  } // set className (v) { // property\n  //     console.log('Parent::className', v);\n  // }\n\n\n  setAttribute(name, value) {\n    // attribute\n    // console.log('Parent::setAttribute', name, value);\n    // todo this.root.setAttribute(name, value);\n    // 这里将 attribute 存起来，在 render 中处理\n    this.attributes.set(name, value);\n    this[name] = value; // this[name] = value;\n  }\n\n  appendChild(child) {\n    // children\n    // console.log('Parent::appendChild', child);\n    this.children.push(child); // child.mountTo(this.root);    // 这里不要直接 moute\n  }\n\n  set subTitle(value) {\n    this.properties.set('subTitle', value);\n  }\n\n  mountTo(parent) {\n    this.render().mountTo(parent);\n  }\n\n  render() {\n    let children = this.attributes.get('data').map((url, i) => {\n      let element = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"img\", {\n        src: url,\n        enableEvent: \"true\",\n        onPanStart: handlePanStart,\n        index: i,\n        onPan: handlePan,\n        onPanEnd: handlePanEnd\n      }); // 禁用拖拽\n\n      element.addEventListener('dragstart', event => event.preventDefault());\n      return element;\n    });\n    let root = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(\"div\", {\n      class: this.attributes.get('class')\n    }, children);\n    let positon = 0;\n    let timeLine = new _lib_animation__WEBPACK_IMPORTED_MODULE_1__[\"Timeline\"](); // 两个一组 做移动\n\n    let nextPic = () => {\n      // 下一张图片索引\n      let nextPositon = (positon + 1) % children.length;\n      let current = children[positon];\n      let next = children[nextPositon];\n      let currentAnimation = new _lib_animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](current.style, 'transform', v => `translateX(${v}%)`, -100 * positon, -100 - 100 * positon, 1000, 0, _lib_cub__WEBPACK_IMPORTED_MODULE_2__[\"ease\"]);\n      let nextAnimation = new _lib_animation__WEBPACK_IMPORTED_MODULE_1__[\"Animation\"](next.style, 'transform', v => `translateX(${v}%)`, 100 - 100 * nextPositon, -100 * nextPositon, 1000, 0, _lib_cub__WEBPACK_IMPORTED_MODULE_2__[\"ease\"]);\n      timeLine.add(currentAnimation);\n      timeLine.add(nextAnimation);\n      positon = nextPositon; // 动画：图片的起始位置\n      // current.style.transform = `translateX(${-100 * positon}%)`;     // 0\n      // next.style.transform = `translateX(${100 - 100 * nextPositon}%)`;  // 1\n      // 执行完这些代码，浏览器会在下一帧让其生效\n      // transition 生效需要间隔，所以需要用 setTimeout，setTimeout 动画生效\n      // setTimeout(() => {\n      //   // 动画：图片的终止位置\n      //   current.style.transform = `translateX(${-100 - 100 * positon}%)`;  // -1 位置\n      //   next.style.transform = `translateX(${-100 * nextPositon}%)`;       // 0 的位置\n      //   positon = nextPositon;\n      // }, 16); // 16 = 0, 16 更保险一点, 1000 / 60 = 1 帧的时间\n    };\n\n    let timer = setInterval(nextPic, 3000); // window.nextPic = nextPic;\n    // nextPic()\n\n    timeLine.start();\n\n    function handlePanStart(event) {\n      timeLine.pause();\n      clearInterval(timer);\n      let lastPosition = (positon - 1 + children.length) % children.length;\n      let nextPositon = (positon + 1) % children.length;\n      let current = children[positon];\n      let last = children[lastPosition];\n      let next = children[nextPositon];\n      current.style.transform = `translateX(${-750 * positon}px)`; // 当前图片的正确的位置\n\n      last.style.transform = `translateX(${-750 - 750 * lastPosition}px)`; // 前一个\n\n      next.style.transform = `translateX(${750 - 750 * nextPositon}px)`; // 后一个\n    }\n\n    function handlePan(event) {\n      event = event.detail;\n      let lastPosition = (positon - 1 + children.length) % children.length;\n      let nextPositon = (positon + 1) % children.length;\n      let current = children[positon];\n      let last = children[lastPosition];\n      let next = children[nextPositon];\n      current.style.transform = `translateX(${event.clientX - event.startX - 750 * positon}px)`;\n      last.style.transform = `translateX(${event.clientX - event.startX - 750 - 750 * lastPosition}px)`;\n      next.style.transform = `translateX(${event.clientX - event.startX + 750 - 750 * nextPositon}px)`;\n    }\n\n    function handlePanEnd(event) {\n      event = event.detail;\n      let lastPosition = (positon - 1 + children.length) % children.length;\n      let nextPositon = (positon + 1) % children.length; // 抬手 判断 \n      // 到底下一张还是上一张\n\n      let offset = 0;\n\n      if (event.clientX - event.startX > 250) {\n        offset = 1;\n      } else if (event.clientX - event.startX < -250) {\n        offset = -1;\n      }\n\n      let current = children[positon];\n      let last = children[lastPosition];\n      let next = children[nextPositon]; // current.style.transition = 'ease 0.2s';\n      // last.style.transition = 'ease 0.2s';\n      // next.style.transition = 'ease 0.2s';\n\n      current.style.transform = `translateX(${offset * 750 - 750 * positon}px)`;\n      last.style.transform = `translateX(${offset * 750 - 750 - 750 * lastPosition}px)`;\n      next.style.transform = `translateX(${offset * 750 + 750 - 750 * nextPositon}px)`; // offset 负值 为 左滑\n\n      positon = (positon - offset + children.length) % children.length;\n      timer = setInterval(nextPic, 3000);\n      timeLine.restart();\n    }\n\n    return root;\n  }\n\n}\n\nlet component = Object(_createElement_js__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(Carousel, {\n  class: \"carousel\",\n  data: [\"https://yanxuan.nosdn.127.net/e1d32c538a9fcf420411592746098ad2.jpg?type=webp&amp;imageView&amp;quality=75&amp;thumbnail=750x0\", \"https://yanxuan.nosdn.127.net/7e01b30c2c440e118cf09e14c7a69266.jpg?type=webp&imageView&quality=75&thumbnail=750x0\", \"https://yanxuan.nosdn.127.net/94408b4d014ce6774e8f768bdf9b6f60.jpg?type=webp&amp;imageView&amp;quality=75&amp;thumbnail=750x0\", \"https://yanxuan.nosdn.127.net/e14d684c9dc43de2af5215c3d49b6870.jpg?type=webp&amp;imageView&amp;quality=75&amp;thumbnail=750x0\"]\n});\ncomponent.subTitle = 'i am sub title';\ncomponent.mountTo(document.body); // console.log(component);\n// component.id = 'a';\n// component.setAttribute('id', 'a');\n\n//# sourceURL=webpack:///./5-end-version.js?");

/***/ }),

/***/ "./createElement.js":
/*!**************************!*\
  !*** ./createElement.js ***!
  \**************************/
/*! exports provided: createElement, Text, Element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createElement\", function() { return createElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Element\", function() { return Element; });\n/* harmony import */ var _lib_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/events */ \"./lib/events.js\");\n\nfunction createElement(Cls, attributes, ...children) {\n  // console.log(arguments);\n  let o;\n\n  if (typeof Cls === 'string') {\n    o = new Element(Cls);\n  } else {\n    o = new Cls({\n      timer: null\n    });\n  }\n\n  for (let name in attributes) {\n    o.setAttribute(name, attributes[name]);\n  } // 递归把子节点 渲染完成\n\n\n  let visit = children => {\n    for (let child of children) {\n      if (child instanceof Array) {\n        visit(child);\n        continue;\n      }\n\n      if (typeof child === 'string') {\n        child = new Text(child);\n      }\n\n      o.appendChild(child);\n    }\n  };\n\n  visit(children);\n  return o;\n}\nclass Text {\n  constructor(text) {\n    this.root = document.createTextNode(text);\n  }\n\n  mountTo(parent) {\n    parent.appendChild(this.root);\n  }\n\n}\nclass Element {\n  constructor(type) {\n    // config\n    // console.log('Parent::config', config);\n    this.children = [];\n    this.root = document.createElement(type);\n  } // set className (v) { // property\n  //     console.log('Parent::className', v);\n  // }\n\n\n  setAttribute(name, value) {\n    // attribute\n    // console.log('Parent::setAttribute', name, value);\n    if (name.match(/^on([\\s\\S]+)$/)) {\n      this.root.addEventListener(RegExp.$1.toLowerCase(), value);\n      return;\n    }\n\n    this.root.setAttribute(name, value);\n\n    if (name === 'enableEvent') {\n      Object(_lib_events__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.root);\n    }\n  }\n\n  appendChild(child) {\n    // children\n    // console.log('Parent::appendChild', child);\n    this.children.push(child); // child.mountTo(this.root);    // 这里不要直接 moute\n  }\n\n  addEventListener() {\n    this.root.addEventListener(...arguments);\n  }\n\n  get style() {\n    return this.root.style;\n  }\n\n  mountTo(parent) {\n    parent.appendChild(this.root);\n\n    for (let child of this.children) {\n      if (typeof child === 'string') {\n        child = new Text(child);\n      }\n\n      child.mountTo(this.root);\n    }\n  }\n\n}\n\n//# sourceURL=webpack:///./createElement.js?");

/***/ }),

/***/ "./lib/animation.js":
/*!**************************!*\
  !*** ./lib/animation.js ***!
  \**************************/
/*! exports provided: Timeline, Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\nclass Timeline {\n  constructor() {\n    this.animations = [];\n    this.currentRAFid = null;\n    this.state = 'init';\n  }\n\n  tick() {\n    // 当前时间\n    let animations = this.animations.filter(animation => !animation.finished);\n    let t = Date.now() - this.startTime; // console.log(t);\n\n    for (let animation of this.animations) {\n      let {\n        object,\n        property,\n        template,\n        delay,\n        start,\n        end,\n        timingFunction,\n        duration,\n        whenAddTime\n      } = animation; // t - delay 当前走过的时间\n      // console.log(t, delay, t - delay)\n      // if (t - delay < 0) continue;\n      // 当前走过的时间 占比\n\n      let hasPassedTime = t - delay - whenAddTime;\n      let progression = timingFunction(hasPassedTime / duration); // 超时 就不执行了\n\n      if (t > animation.duration + animation.delay + whenAddTime) {\n        // continue;\n        // t = animation.duration + animation.delay;\n        progression = 1;\n        animation.finished = true;\n      }\n\n      let value = start + progression * (end - start);\n      object[property] = template(value);\n    } // if (animations.length) {\n\n\n    this.currentRAFid = requestAnimationFrame(() => {\n      this.tick();\n    }); // }\n  }\n\n  start() {\n    this.state = 'playing';\n    this.startTime = Date.now();\n    this.tick();\n  }\n\n  pause() {\n    this.state = 'paused';\n    this.pauseTime = Date.now();\n    cancelAnimationFrame(this.currentRAFid);\n  }\n\n  add(animation, whenAddTime) {\n    this.animations.push(animation);\n\n    if (this.state === 'playing') {\n      animation.whenAddTime = whenAddTime === undefined ? Date.now() - this.startTime : whenAddTime;\n    } else {\n      animation.whenAddTime = whenAddTime === undefined ? 0 : whenAddTime;\n    }\n  }\n\n  restart() {\n    // this.pause()\n    this.animations = [];\n    this.start();\n  }\n\n  resume() {\n    this.startTime += Date.now() - this.pauseTime;\n    this.tick();\n  }\n\n}\nclass Animation {\n  constructor(object, property, template, start, end, duration, delay = 0, timingFunction) {\n    this.object = object;\n    this.property = property;\n    this.template = template;\n    this.start = start;\n    this.end = end;\n    this.duration = duration;\n    this.delay = delay;\n\n    this.timingFunction = timingFunction || function (t) {\n      return t;\n    };\n  }\n\n}\n\n//# sourceURL=webpack:///./lib/animation.js?");

/***/ }),

/***/ "./lib/cub.js":
/*!********************!*\
  !*** ./lib/cub.js ***!
  \********************/
/*! exports provided: cubicBezier, ease */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ease\", function() { return ease; });\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  const ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,\n  // implicit first and last control points are (0,0) and (1,1).\n\n  const ax = 3 * p1x - 3 * p2x + 1;\n  const bx = 3 * p2x - 6 * p1x;\n  const cx = 3 * p1x;\n  const ay = 3 * p1y - 3 * p2y + 1;\n  const by = 3 * p2y - 6 * p1y;\n  const cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  }\n\n  function sampleCurveY(t) {\n    return ((ay * t + by) * t + cy) * t;\n  } // Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    // First try a few iterations of Newton's method -- normally very fast.\n    // http://en.wikipedia.org/wiki/Newton's_method\n\n    for (let i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative;\n    } // Fall back to the bisection method for reliability.\n    // bisection\n    // http://en.wikipedia.org/wiki/Bisection_method\n\n\n    var t1 = 1;\n    /* istanbul ignore next */\n\n    var t0 = 0;\n    /* istanbul ignore next */\n\n    t2 = x;\n    /* istanbul ignore next */\n\n    while (t1 > t0) {\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      if (x2 > 0) {\n        t1 = t2;\n      } else {\n        t0 = t2;\n      }\n\n      t2 = (t1 + t0) / 2;\n    } // Failure\n\n\n    return t2;\n  }\n\n  function solve(x) {\n    return sampleCurveY(solveCurveX(x));\n  }\n\n  return solve;\n}\nconst ease = cubicBezier(.25, .1, .25, 1);\n\n//# sourceURL=webpack:///./lib/cub.js?");

/***/ }),

/***/ "./lib/events.js":
/*!***********************!*\
  !*** ./lib/events.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return enableEvent; });\n// let element = document.body;\n// enableEvent();\nfunction enableEvent(element) {\n  let contexts = Object.create(null);\n  let MOUSE_SYMBOL = Symbol('mouse'); // pc undefined\n  // mobile null\n\n  if (element.ontouchstart !== null) {\n    element.addEventListener('mousedown', event => {\n      contexts[MOUSE_SYMBOL] = Object.create(null);\n      start(event, contexts[MOUSE_SYMBOL]);\n\n      let mousemove = event => {\n        move(event, contexts[MOUSE_SYMBOL]);\n      };\n\n      let mouseend = event => {\n        end(event, contexts[MOUSE_SYMBOL]);\n        document.removeEventListener('mousemove', mousemove);\n        document.removeEventListener('mouseup', mouseend);\n      };\n\n      document.addEventListener('mousemove', mousemove);\n      document.addEventListener('mouseup', mouseend);\n    });\n  }\n\n  element.addEventListener('touchstart', event => {\n    for (let touch of event.changedTouches) {\n      contexts[touch.identifier] = Object.create(null);\n      start(touch, contexts[touch.identifier]);\n    }\n  });\n  element.addEventListener('touchmove', event => {\n    for (let touch of event.changedTouches) {\n      move(touch, contexts[touch.identifier]);\n    }\n  });\n  element.addEventListener('touchend', event => {\n    for (let touch of event.changedTouches) {\n      end(touch, contexts[touch.identifier]);\n    }\n  }); // 系统事件进来：弹窗\n\n  element.addEventListener('touchcancel', event => {\n    for (let touch of event.changedTouches) {\n      cancel(touch, contexts[touch.identifier]);\n      delete contexts[touch.identifier];\n    }\n  }); // tap\n  // pan panstart panmove panend\n  // flick 快速扫过\n  // press pressstart pressend\n\n  function start(point, contexts) {\n    contexts.startX = point.clientX;\n    contexts.startY = point.clientY;\n    contexts.moves = [];\n    contexts.isTap = true;\n    contexts.isPan = false;\n    contexts.isPress = false;\n    contexts.timeoutHandler = setTimeout(() => {\n      // 500 之后发现 还要考虑是不是滑动事件\n      if (contexts.isPan) {\n        return;\n      } // 不滑动 就是 press\n\n\n      contexts.isTap = false;\n      contexts.isPan = false;\n      contexts.isPress = true;\n    }, 500);\n  }\n\n  function move(point, contexts) {\n    let dx = point.clientX - contexts.startX,\n        dy = point.clientY - contexts.startY; // 如果移动了 10px 且之前 没有 pan 过 就是 panStart\n\n    if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {\n      contexts.isTap = false;\n      contexts.isPan = true;\n      contexts.isPress = false;\n      console.log('panStart');\n      let e = new CustomEvent('panstart');\n      element.dispatchEvent(e);\n    } // \n\n\n    if (contexts.isPan) {\n      contexts.moves.push({\n        dx,\n        dy,\n        t: Date.now()\n      }); // 只要 最后 300ms 的移动距离\n\n      contexts.moves = contexts.moves.filter(r => Date.now() - r.t < 300);\n      let e = new CustomEvent('pan', {\n        detail: {\n          startX: contexts.startX,\n          startY: contexts.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      });\n      element.dispatchEvent(e);\n    }\n  }\n\n  function end(point, contexts) {\n    if (contexts.isPan) {\n      console.log('panend');\n      let e = new CustomEvent('panend', {\n        detail: {\n          startX: contexts.startX,\n          startY: contexts.startY,\n          clientX: point.clientX,\n          clientY: point.clientY\n        }\n      });\n      element.dispatchEvent(e);\n    }\n\n    if (contexts.isTap) console.log('tap');\n    if (contexts.isPress) console.log('isPress');\n\n    if (contexts.isPan) {\n      // 最后一次距离\n      let dx = point.clientX - contexts.startX,\n          dy = point.clientY - contexts.startY; // 最早的一次的 距离\n\n      let record = contexts.moves[0]; // 最早的一次距离和最后的一次距离之差 / 时间\n\n      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);\n      let isFlick = speed > 2.5;\n\n      if (isFlick) {\n        console.log('flick');\n      }\n    } // 抬手 clear\n\n\n    clearTimeout(contexts.timeoutHandler);\n  }\n\n  function cancel() {}\n}\n\n//# sourceURL=webpack:///./lib/events.js?");

/***/ })

/******/ });