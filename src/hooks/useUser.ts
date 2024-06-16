import useSWR, { mutate } from "swr"
import { message } from "antd"
import UserService from "../utils/services/user.service"
import User from "../utils/models/user.model"
import { handleError, handleSucces } from "../utils/handleMessage"
import Cookies from "js-cookie"
import { KEYS } from "../constants"

const userService = new UserService()

const useUser = (type: string) => {
  // const listeUser = useSWR([userService.api.GET, type], userService.get)

  // const addUser = async function (user: User) {
  //   const res = await userService
  //     .post(user, {"social": false, "isadmin": true})
  //     .catch(handleError)
  //   handleSucces(res, (d: any) => {
  //     message.success("Operation reussie ! le user a été enregistré.")
  //     mutate([userService.api.GET, type])
  //   })
  // }

  // const updUser = async function (user: User) {
  //   const res = await userService.update(user).catch(handleError)
  //   handleSucces(res, (d: any) => {
  //     message.success("Operation reussie ! le user a été modifié.")
  //     mutate([userService.api.GET, type])
  //   })
  // }

  // const delUser = async function (user: User) {
  //   const res = await userService.delete(user).catch(handleError)
  //   handleSucces(res, (d: any) => {
  //     message.success("Operation reussie ! le user a été supprimé.")
  //     mutate([userService.api.GET, type])
  //   })
  // }

  const onFinish = async (values: any) => {
    const res = await userService.login(values).catch(handleError)

    handleSucces(res, (d: any) => {
      mutate([userService.api.GET, type])

      Cookies.set(KEYS.ACCESS_TOKEN, "Token")
      Cookies.set(KEYS.REFRESH_TOKEN, "Refresh_Token")
      window.location.replace("/admin")
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return {
    onFinish,
    onFinishFailed,
  }
}

export default useUser
