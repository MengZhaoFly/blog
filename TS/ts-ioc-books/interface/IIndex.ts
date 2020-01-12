import { Model } from "../models/User";
export interface IIndex {
  getUser(id: string): Model.User
}