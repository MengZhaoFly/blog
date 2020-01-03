const _XMLHttpRequest = window.XMLHttpRequest;
if (_XMLHttpRequest) {
  // noinspection JSValidateTypes
  window.XMLHttpRequest = function XMLHttpRequest() {
    const xhr = new _XMLHttpRequest();

    const errorHandler = function () {
      // 上报请求失败
    };

    const timeoutHandler = function () {
      // 上报请求超时
    };

    const readyHandler = function () {
      if (xhr.readyState === xhr.DONE) {
        // 上报请求成功
        // UNSENT: 0
          // OPENED: 1
          // HEADERS_RECEIVED: 2
          // LOADING: 3
          // DONE: 4
        console.log('请求成功了...', xhr);
      }
    };

    xhr.addEventListener('error', errorHandler, true);
    xhr.addEventListener('timeout', timeoutHandler, true);
    xhr.addEventListener('readystatechange', readyHandler, true);

    return xhr;
  };
}
