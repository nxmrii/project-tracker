import {
  createRoute,
  redirect,
} from "@tanstack/react-router"

import ProjectDetailsPage
  from "../features/projects/pages/ProjectDetailsPage"

import ProjectsPage
  from "../features/projects/pages/ProjectsPage"

import { hasAuthToken }
  from "../features/auth/api/auth.api"
import { rootRoute } from "./root"


export const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,

  path: "/projects",

  beforeLoad: () => {

    if (!hasAuthToken()) {

      throw redirect({
        to: "/login",
      })

    }

  },

  component: ProjectsPage,
})


export const projectDetailsRoute =
  createRoute({

    getParentRoute: () => rootRoute,

    path: "/projects/$projectId",

    beforeLoad: () => {

      if (!hasAuthToken()) {

        throw redirect({
          to: "/login",
        })

      }

    },

    component: ProjectDetailsPage,
  })