class Main {
  constructor(options) {
    this.Service = options.Service;
    this.RouterService = options.Router;
    this.render();
  }
  render() {
    let content = this.Service.request();
    console.log('content from', content);
  }
}
export default Main;