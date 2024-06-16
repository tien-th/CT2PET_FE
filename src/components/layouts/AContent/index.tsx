import React from "react"
import { Layout, PageHeader, Breadcrumb, Button } from "antd"
import { useLocation } from "react-router-dom"
import routes from "../../../routes/page-nav"
import { createBreadCrumb } from "../../../core/helpers/breadcrump.helper"
const { Content } = Layout

interface Props {
  location?: any
  children: any
}

const AContent = (props: Props) => {
  const { pathname } = useLocation()
  const { breadcrumbItems, pageInfos } = createBreadCrumb(
    routes,
    pathname,
    "/admin",
  )

  return (
    <Content
      style={{
        minHeight: "calc(100vh - 170px)",
        paddingTop: "40px",
      }}
    >
      {/* <div className="grid grid-cols-3 gap-4 justify-end">
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      </div>

      <PageHeader
        className="site-page-header"
        title={(pageInfos && pageInfos.name) || ""}
      /> */}

      {/* <div className="site-layout-background" style={{ padding: 20 }}> */}
      <div className="site-layout-background">{props.children}</div>
    </Content>
  )
}

export default AContent
