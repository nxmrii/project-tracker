import {
  delay,
  projects,
} from "../../../lib/mockStore"

import type {
  Project,
} from "../project.type"


export async function getProjectsApi(): Promise<Project[]> {
  await delay()

  return [...projects]
}


export type CreateProjectPayload = {
  name: string
  deadline: string
}


export async function createProjectApi(
  payload: CreateProjectPayload
): Promise<Project> {

  await delay()

  const newProject: Project = {
    id: Date.now(),

    name: payload.name,

    deadline: payload.deadline,

    members: [],

    tasks: [],
  }

  projects.push(newProject)

  return newProject
}


export async function deleteProjectApi(
  projectId: number
): Promise<void> {

  await delay()

  const index = projects.findIndex(
    (project) => project.id === projectId
  )

  if (index === -1) {
    throw new Error("Project not found")
  }

  projects.splice(index, 1)
}