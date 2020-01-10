(function (modules) {

  // The require function
  function __webpack_require__(moduleId) {

    // Create a new module (and put it into the cache)
    var module = {
      i: moduleId,
      l: false,
      exports: {}

    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;

  }

  return __webpack_require__("./src/index.js");

})
  /************************************************************************/
  ({

/***/ "./src/hello.js":
/*!**********************!*\
  !*** ./src/hello.js ***!
  \**********************/
/*! exports provided: say */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"say\", function() { return say; });\nfunction say(name) {\n  return `hello ${name}`;\n}\n\n//# sourceURL=webpack:///./src/hello.js?");

        /***/
      }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _hello_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hello.js */ \"./src/hello.js\");\n\ndocument.write(Object(_hello_js__WEBPACK_IMPORTED_MODULE_0__[\"say\"])(\"webpack\"));\n\n//# sourceURL=webpack:///./src/index.js?");

        /***/
      })


  });