// common.js
export default (text) => console.log(text);
console.log('dev123');
// index.js
import common from '../../common/index';
common()
// 打包完的结果：
(function(modules) {
    // import/require -> __webpack_require__
    function __webpack_require__() {}
    __webpack_require__(0);
})([
(function() {
 __webpack_require__(1);
}),
(function() {
  // index.js
  var _common_index = (text) => console.log(text);
  _common_index();
})])