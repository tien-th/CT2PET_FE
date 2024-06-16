import { message } from "antd"
import { AxiosResponse } from "axios"

export const handleError = function (error: any) {
  if (error.response) {
    message.warning("Existing item!")
  } else if (error.request) {
    message.error("PLC error! Please Contact the server administrator.")
  } else {
    message.error("Internal error! Please Contact the platform administrator.")
  }
}

export const handleSucces = function (data: AxiosResponse | void, cb?: any) {
  if (data && data.status == 200) {
    if (cb) {
      cb(data)
    } else {
      return data
    }
  } else if (data && data.status == 204) {
    message.warning(
      "No data! The requested resource does not exist on the server.",
    )
  } else if (data && data.status == 201) {
    message.success("Successful operation! The data is automatically updated.")
  }
}
