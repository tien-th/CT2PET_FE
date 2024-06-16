import React from "react"
import IRoute from "../core/objects/IRoute"

//! Pages
const DashboardPage = React.lazy(() => import("../pages/Dashboard"))
const ProcessingPage = React.lazy(() => import("../pages/Processing"))
const ResultPage = React.lazy(() => import("../pages/Result"))
const ProfilePage = React.lazy(() => import("../pages/Profile"))
const DetectGeneralPage = React.lazy(() => import("../pages/DetectGeneral"))
const TestingPage = React.lazy(() => import("../pages/Testing"))

//TODO Router Table
const routes: IRoute[] = [
  {
    path: "/",
    name: "App",
    exact: true,
    component: DetectGeneralPage,
  },
  {
    path: "/test",
    name: "testing",
    exact: true,
    component: TestingPage,
  },
  {
    path: "/processing",
    name: "processing",
    exact: true,
    icon: "AndroidOutlined",
    component: ProcessingPage,
  },
  {
    path: "/result",
    name: "result",
    exact: true,
    icon: "AndroidOutlined",
    component: ResultPage,
  },
  {
    path: "/menu-2",
    name: "Menu 2",
    exact: true,
    icon: "AppleOutlined",
    redirect: "/menu-2-1",
    children: [
      {
        path: "/menu-2-1",
        name: "Demo 2-1",
        exact: true,
        component: DashboardPage,
      },
      {
        path: "/menu-2-2",
        name: "Demo 2-2",
        exact: true,
        redirect: "/menu-2-2-1",
        component: DashboardPage,
        children: [
          {
            path: "/menu-2-2-1",
            name: "Demo 2-2-1",
            exact: true,
            component: DashboardPage,
            hidden: true,
          },
          {
            path: "/menu-2-2-2",
            name: "Demo 2-2-2",
            exact: true,
            component: DashboardPage,
            hidden: true,
          },
        ],
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    hidden: true,
  },
]

export default routes
