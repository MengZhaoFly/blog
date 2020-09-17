module.exports = {
  set body(val) {
    this._body = val;
    // const setType = !this.header['content-type'];
    // string
    if ('string' == typeof val) {
      // 有 < 字符
      // if (setType) 
      this.type = /^\s*</.test(val) ? 'html' : 'text';
      this.length = Buffer.byteLength(val);
      return;
    }
  },
  get body() {
    return this._body;
  },
}