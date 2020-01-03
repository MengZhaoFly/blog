class Service {
  request() {
    throw `${this.constructor.name} 没有实现 request 方法！`
  }
}

class Ajax extends Service {
  request() {
    return this.constructor.name;
  }
}

export default Ajax;