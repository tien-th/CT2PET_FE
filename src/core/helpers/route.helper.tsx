import React from "react"
import { Redirect, Route } from "react-router-dom"
import { isConnectedUser } from "../objects/Auth"
import IRoute from "../objects/IRoute"

export const createRoute = (
  route: IRoute,
  ind: number,
  parent: string = "",
): any => {
  let resultsRoutes: any[] = []
  if (route.redirect && route.redirect.length > 0) {
    resultsRoutes.push(
      <Redirect
        exact
        from={`${parent}${route.path}`}
        to={`${parent}${route.path}${route.redirect}`}
      />,
    )
  }

  if (route.children && route.children.length > 0) {
    resultsRoutes.push(
      ...route.children.map((iRoute, idx) =>
        createRoute(iRoute, idx, `${parent}${route.path}`),
      ),
    )
  } else if (route.component) {
    console.log(`${parent}${route.path}`)

    resultsRoutes.push(
      <Route
        key={ind}
        exact={route.exact}
        path={`${parent}${route.path}`}
        render={(props) => <route.component {...props} />}
      />,
    )
  }

  return resultsRoutes
}

export const createProtectedRoute = (
  route: IRoute,
  ind: number,
  parent: string = "",
): any => {
  let resultsRoutes: any[] = []

  // if (!isConnectedUser()) {
  //   resultsRoutes.push(
  //     <Redirect exact from={`${parent}${route.path}`} to={`/401`} />,
  //   )
  //   return resultsRoutes
  // }

  return createRoute(route, ind, parent)
}
