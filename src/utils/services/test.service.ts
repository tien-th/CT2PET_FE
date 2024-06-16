import configData from "../../assets/config/production.json"
import Caller from "../../core/objects/Caller"

export default class TestService {
  api: any = {}
  constructor() {
    this.api = configData.CT2PET_API_ENDPOINTS.TEST
  }

  getCTPETData() {
    return Caller.init()
      .get(this.api.GET_CT_PET)
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

  postCTPETData(data: Object) {
    return Caller.init()
      .post(this.api.POST_CT_PET, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
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
