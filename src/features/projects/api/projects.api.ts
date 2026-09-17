import { delay, projects } from "../../../lib/mockStore"
import type { Project } from "../project.type"

export async function getProjectsApi(): Promise<Project[]> {
  await delay()

  return projects
}