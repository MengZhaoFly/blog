const Compiler = require('./Compiler')

// class  new HtmlWebpackPlugin()
// apply 方法
class MyPlugin {
  constructor() {
  }
  /**
   * 
   * Compiler {
   *  hooks: {
   *   done: new 
   *   run:
   *   beforeRun: 
   *  }
   * }
   */
  // compiler = new Compiler();
  apply(compiler) {

    // 插件 就是监听 webpack 内部 Compiler 上某个事件
    // 这里 用 tap tapPromise 监听
    // webpack 使用了 tapable 这个库，来管理自己打包发生时的一系列事件，并且 告知外面的 插件
    // 这样 提前监听的 插件也就执行了
    
    compiler.hooks.brake.tap("WarningLampPlugin", () => console.log('WarningLampPlugin'));
    compiler.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
    compiler.hooks.calculateRoutes.tapPromise("calculateRoutes tapAsync", (source, target, routesList) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`tapPromise to ${source} ${target} ${routesList}`)
          resolve();
        }, 1000)
      });
    });
  }
}



const options = {
  plugins: [new MyPlugin()]
}

const compiler = new Compiler();

for (const plugin of options.plugins) {
  plugin.apply(compiler);
}
// webpack 流程 也就开始了
// 
compiler.run();


// 插件：
// 插件订阅者：run、before-run, compiler, done.... 几十个事件
// 发布者：就是 webpack 编译的时候到了那个时机，就发布 


// loader：编译原理
