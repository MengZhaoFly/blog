class CodeBeautify {
  constructor(options) {
      this.options = options
      this.externalModules = {}
  }

  apply(compiler) {
      compiler.hooks.emit.tap('CodeBeautify', (compilation)=> {
        console.log(compilation.assets);
          Object.keys(compilation.assets).forEach((data)=> {
              let content = compilation.assets[data].source() // 欲处理的文本
              content = content.replace(/\/\*\*\*\*\*\*\//g, '');
              compilation.assets[data] = {
                  source() {
                      return content
                  },
                  size() {
                      return content.length
                  }
              }
          })
      })
  }
}
module.exports = CodeBeautify
