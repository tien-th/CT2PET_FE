import React from "react"
import { Layout, Menu } from "antd"
import { logout } from "../../../core/objects/Auth"
import { Link } from "react-router-dom"
const { Header } = Layout

interface Props {}

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/admin/profile">Profile</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="99999" onClick={() => logout()}>
      Logout
    </Menu.Item>
  </Menu>
)

const AHeader = (props: Props) => {
  return (
    <Header
      className="site-layout-header"
      style={{
        padding: 0,
        height: "unset",
        boxShadow: "0px 2px 4px 0px #0000001A",
      }}
    >
      <a
        style={{
          color: "#3D88E1",
          // lineHeight: "32px",
          fontSize: "32px",
          marginBlock: "16px",
        }}
        href="/"
      >
        <span style={{ marginRight: "10px", fontSize: "32px" }}>
          <img src="/logo.png" alt="" height={48}/>
        </span>
      </a>
    </Header>
  )
}

export default AHeader
