const _fetch = window.fetch;
if (_fetch) {
  window.fetch = function fetch(url, options = {}) {
    return _fetch.call(window, url, options)
      .then(function (res) {
        // 上报请求成功
        console.log(res);
        return res;
      })
      .catch(function (err) {
        // 上报请求失败
        throw err;
      });
  };
}
