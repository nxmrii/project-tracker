import {
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router"

import { rootRoute } from "./root"

import { loginRoute }
  from "./public.routes"

import {
  projectsRoute,
  projectDetailsRoute,
} from "./protected.routes"

import { hasAuthToken }
  from "../features/auth/api/auth.api"

  


const indexRoute = createRoute({
  getParentRoute: () => rootRoute,

  path: "/",

  beforeLoad: () => {

    if (hasAuthToken()) {
      throw redirect({
        to: "/projects",
      })
    }

    throw redirect({
      to: "/login",
    })
  },
})


const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  projectsRoute,
  projectDetailsRoute,
])


export const router = createRouter({
  routeTree,
})