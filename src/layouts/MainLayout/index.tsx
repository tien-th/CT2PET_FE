import React, { Suspense } from "react"
import "./index.scss"
import { Button, Col, Layout, Row } from "antd"
import AContent from "../../components/layouts/AContent"
import AHeader from "../../components/layouts/AHeader"
import ASidebar from "../../components/layouts/ASidebar"
import { createProtectedRoute } from "../../core/helpers/route.helper"
import { Redirect, Switch } from "react-router-dom"
import routes from "../../routes/page-nav"
import { createMenu } from "../../core/helpers/menu.helper"

const { Footer } = Layout

interface Props {}

const MainLayout = (props: Props) => {
  return (
    <Layout className="h-full">
      {/* <ASidebar icon="Hisoft VN">
        {routes.map((route, idx) => createMenu(route, idx, "/admin"))}
      </ASidebar> */}

      {/* <Layout className="site-layout" style={{ marginLeft: 200 }}> */}
      <Layout className="site-layout" style={{ position: "relative" }}>
        <AHeader />
        <AContent>
          <Suspense fallback={"lorem"}>
            <Switch>
              {routes.map((route, idx) => {
                return createProtectedRoute(route, idx, "")
              })}
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </AContent>
        <img
          src="/bottom_layout.png"
          alt="bottom layout"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 0,
          }}
        />
        <div className="footer-logo">
          {/*<div>
            <img src="/vaipe.png" alt="" />
          </div>
          <div>
            <img src="/vinuni.png" alt="" />
          </div>
          <div>
            <img src="/BKAI.png" alt="" />
          </div>*/}
        </div>
      </Layout>

      <Layout.Footer>
        {/* Hisoft VN &copy;{new Date().getFullYear()} */}
        {/*<div>Copyright©CT2PET Translator 2023. All rights reserved.</div>*/}
        <div>
          <a href="https://vaipe.org/">https://vaipe.org/</a>
        </div>
      </Layout.Footer>
    </Layout>
  )
}

export default MainLayout
