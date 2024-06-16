import configData from "../../assets/config/production.json"
import Caller from "../../core/objects/Caller"

export default class FeedbackService {
  api: any = {}
  constructor() {
    this.api = configData.API_ENDPOINTS.FEEDBACK
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

  sendFeedback(sessionId: string, feedback: string) {
    const formData = new FormData()
    formData.append("session_id", sessionId)
    formData.append("feedback", feedback)
    return Caller.init()
      .post(this.api.CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        if (error.response) {
          throw error.response.data
        }
        if (error.data) {
          throw error.data
        } else {
          throw error
        }
      })
  }
}
