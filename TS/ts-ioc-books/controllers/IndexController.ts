import {
  Router,
  controller,
  interfaces,
  httpGet,
  inject,
  TYPE,
  provideThrowable,
  TAGS
} from "../ioc/ioc";
import { Model } from "../models/User";

@controller("/")
@provideThrowable(TYPE.Controller, "IndexController")
export default class IndexController implements interfaces.Controller {
  private indexService;
  constructor(@inject(TAGS.IndexService) indexService) {
      this.indexService = indexService
  }
  @httpGet("/")
  private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
      const result: Model.User = this.indexService.getUser("0");
      // ctx.body = {
      //     email: result.email
      // }
      // ctx.body = await ctx.render("index", {
      //     data: result.name
      // });
      ctx.body = result
  }
}