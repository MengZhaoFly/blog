import { IIndex } from "../interface/IIndex";
import { Model } from "../models/User";
import { TAGS, provide } from "../ioc/ioc";

// console.log("📚",TAGS.IndexService);
@provide(TAGS.IndexService)
export class IndexService implements IIndex {
  private userStorage: Model.User[] = [
    {
      email: "aaaa@qq.com",
      name: "aaaa"
    },
    {
      email: "bbbb@qq.com",
      name: "bbbb"
    }
  ]
  public getUser(id: string): Model.User {
    let result: Model.User;
    result = this.userStorage[id];
    return result;
  }
}