import { Row } from "antd"
import React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import routes from "./routes/default-nav"

function App() {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <Row
            justify="center"
            align="middle"
            className="max-w-full min-h-screen text-blue-500"
          ></Row>
        }
      >
        <Switch>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                strict={route.strict ? route.strict : false}
                render={(props) => <route.component {...props} />}
              />
            )
          })}

          {/* <Redirect to="/login" /> */}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
