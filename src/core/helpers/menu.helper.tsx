import React from "react"
import { Menu } from "antd"
import SubMenu from "antd/lib/menu/SubMenu"
import IRoute from "../../core/objects/IRoute"
import { Link } from "react-router-dom"
import * as AntdIcons from "@ant-design/icons"

const CustomIcon = (type: string) => {
  // @ts-ignore
  const AntdIcon = AntdIcons[type]
  if (AntdIcon) {
    return <AntdIcon className="text-lg" />
  }
  return null
}

export const createMenu = (
  route: IRoute,
  ind: number | string,
  parent: string = "",
) => {
  if (route.children && route.children.length > 0) {
    if (
      route.children.length ===
      route.children.filter((item: IRoute) => item.hidden).length
    ) {
      return (
        <Menu.Item key={ind} icon={CustomIcon(route.icon)} className="text-lg">
          <Link to={`${parent}${route.path}`}>{route.name}</Link>
        </Menu.Item>
      )
    }
    return (
      <SubMenu
        key={ind}
        title={route.name}
        icon={CustomIcon(route.icon)}
        className="text-lg"
      >
        {route.children.map((iRoute, idx) =>
          createMenu(iRoute, `${ind}${idx}`, `${parent}${route.path}`),
        )}
      </SubMenu>
    )
  }
  if (!route.hidden) {
    return (
      <Menu.Item key={ind} icon={CustomIcon(route.icon)} className="text-lg">
        <Link to={`${parent}${route.path}`}>{route.name}</Link>
      </Menu.Item>
    )
  }
  return null
}
