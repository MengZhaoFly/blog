const delegate = require('delegates');

const proto = module.exports = {
  onerror(e) {
    console.log(e)
  }
}
/**
 * 一顿委托，方便取出 req res 的值
 */

delegate(proto, 'response')
.access('body')

delegate(proto, 'request')
.access('method')
.access('url')
