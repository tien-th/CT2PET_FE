import configData from "../../assets/config/production.json"
import Caller from "../../core/objects/Caller"
import User from "../models/user.model"
import Login from "../models/user.model"

export default class UserService {
  api: any = {}
  constructor() {
    this.api = configData.API_ENDPOINTS.USER
  }

  // get(url: string, ...rest: any[]) {
  //   let parms: any = {}
  //   if (rest && rest[0]) parms["type"] = rest[0]
  //   return Caller.get(url, parms)
  // }

  // post(data: User, param?: any) {
  //   return Caller.post(this.api.ADD, data, param)
  // }

  // update(data: User, param?: any) {
  //   return Caller.put(this.api.UPD + "/" + data.id, data, param)
  // }

  // delete(data: User) {
  //   return Caller.delete(this.api.DEL + "/" + data.id)
  // }

  login(data: Login, param?: any) {
    return Caller.post(this.api.LOGIN, data, param)
  }
}
