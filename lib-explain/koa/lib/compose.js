function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function(context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      // console.log('中间件', i, index);
      /**
       * 执行 两次 next
       * 初始化： i = 1 index = 1
       * 中间件： i = 2 index = 1
       */
      console.log('-----', i, index);
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        /**
         * fn 即为 app.use() 里面的 async (ctx) => {}
         * 第一个参数 ctx ，第二个参数 next
         */
        return Promise.resolve(fn(context, () => {
          return dispatch(i + 1);
        }));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

module.exports = compose;
