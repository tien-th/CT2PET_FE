import React from "react"
import IRoute from "../core/objects/IRoute"

const MainLayout = React.lazy(() => import("../layouts/MainLayout"))
const LoginScreen = React.lazy(() => import("../pages/Auth/Login"))
const Forbidden = React.lazy(() => import("../pages/Error/Forbidden"))
const NotFound = React.lazy(() => import("../pages/Error/NotFound"))
const Unauthorize = React.lazy(() => import("../pages/Error/Unauthorize"))

//TODO Router Table
const routes: IRoute[] = [
  {
    path: "/403",
    name: "Forbidden",
    exact: true,
    component: Forbidden,
  },
  {
    path: "/404",
    name: "Not Found",
    exact: true,
    component: NotFound,
  },
  {
    path: "/401",
    name: "Not Authorize",
    exact: true,
    component: Unauthorize,
  },
  {
    path: "/",
    name: "Detect",
    exact: false,
    // strict: true,
    component: MainLayout,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    component: LoginScreen,
  },
]

export default routes
