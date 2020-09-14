var _dec, _dec2, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let log = type => {
  // add divide
  return (target, name, descriptor) => {
    setTimeout(() => {
      console.log(target, name, descriptor);
    }, 1000); // 1: 拿到原来的 method

    const method = descriptor.value; //  2: 对 原来的 method 修改

    descriptor.value = function (...args) {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;

      try {
        ret = method.apply(this, args);
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }

      return ret;
    }; // 3: 返回


    return descriptor;
  };
};

let Math = (_dec = log('ADD'), _dec2 = log('divide'), (_class = class Math {
  constructor() {
    this.c = 10;
  }

  add(a, b) {
    return a + b + this.c;
  }

  divide(a, b) {
    return a / b;
  }

}, (_applyDecoratedDescriptor(_class.prototype, "add", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "add"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "divide", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "divide"), _class.prototype)), _class)); // add
// 加上日志的功能 add、divide 被调用的时候，log输出一下

const math = new Math();
console.log(math);
console.log('log', math.add(1, 3));
console.log('log', math.divide(1, 3)); // 装饰者模式：
// AOP：