// import Cookies from "js-cookie"
import User from "../../utils/models/user.model"

export const connectedUser = () => {
  const user = localStorage.getItem("user")
  // const user = Cookies.get("user")
  return user ? (JSON.parse(user as string) as User) : undefined
}

export const isConnectedUser = () => {
  const user = JSON.parse(localStorage.getItem("user") as string) as User
  // const user = JSON.parse(Cookies.get("user")) as User
  return user ? true : false
}

export const setConnectedUser = (user: User) => {
  if (!user) return undefined
  // Cookies.set("user", JSON.stringify(user), {"expires": 7})
  localStorage.setItem("user", JSON.stringify(user))

  return true
}

export const logout = () => {
  localStorage.removeItem("user")
  // Cookies.remove('user')
  window.location.href = "/"
}
