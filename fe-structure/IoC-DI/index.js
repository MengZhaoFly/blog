import Service from './Service.js';
import RouterService from './Router.js';
import Main from './Main.js';

new Main({
  Service: new Service(),
  Router: new RouterService()
})