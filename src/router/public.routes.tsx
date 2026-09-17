import { createRoute } from "@tanstack/react-router"

import LoginPage from "../features/auth/pages/LoginPage"
import { rootRoute } from "./root"




export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,

  path: "/login",

  component: LoginPage,
})