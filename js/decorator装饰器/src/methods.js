let log = (type) => {
  // add divide
  return (target, name, descriptor) => {
    // 1: 拿到原来的 method
    const method = descriptor.value;
    //  2: 对 原来的 method 修改
    descriptor.value =  function(...args) {
      console.info(`(${type}) 正在执行: ${name}(${args}) = ?`);
      let ret;
      try {
        ret = method.apply(this, args);
        console.info(`(${type}) 成功 : ${name}(${args}) => ${ret}`);
      } catch (error) {
        console.error(`(${type}) 失败: ${name}(${args}) => ${error}`);
      }
      return ret;
    }
    // 3: 返回
    return descriptor;
  }
};
class Math{
  
  constructor() {
    this.c = 10
  }
  @log('ADD')
  add (a, b) {
    return a + b + this.c;
  }
  @log('divide')
  divide (a, b) {
    return a / b;
  }
}
// add
// 加上日志的功能 add、divide 被调用的时候，log输出一下

const math = new Math();
console.log(math);
console.log('log', math.add(1, 3));
console.log('log', math.divide(1, 3));
// 装饰者模式：
// AOP：