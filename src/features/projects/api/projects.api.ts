import {
  delay,
  projects,
} from "../../../lib/mockStore"

import type {
  Project,
  TaskStatus,
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

export async function getProjectByIdApi(
  projectId: number
): Promise<Project> {

  await delay()

  const project = projects.find(
    (project) => project.id === projectId
  )

  if (!project) {
    throw new Error("Project not found")
  }

  return project
}

export type AddMemberPayload = {
  projectId: number
  name: string
  role: string
}



//add member
export async function addMemberApi(
  payload: AddMemberPayload
): Promise<Project> {

  await delay()

  const project = projects.find(
    (project) =>
      project.id === payload.projectId
  )

  if (!project) {
    throw new Error("Project not found")
  }

  const newMember = {
    id: Date.now(),
    name: payload.name,
    role: payload.role,
  }

  project.members.push(newMember)

  return project
}


//add task
export type AddTaskPayload = {
  projectId: number
  title: string
  assignedTo: number
  dueDate: string
}


export async function addTaskApi(
  payload: AddTaskPayload
): Promise<Project> {

  await delay()

  const project = projects.find(
    (project) =>
      project.id === payload.projectId
  )

  if (!project) {
    throw new Error("Project not found")
  }

  const newTask = {
    id: Date.now(),

    title: payload.title,

    assignedTo: payload.assignedTo,

    status: "todo" as TaskStatus,

    dueDate: payload.dueDate,
  }

  project.tasks.push(newTask)

  return project
}


//update task status
export type UpdateTaskStatusPayload = {
  projectId: number
  taskId: number
  status: TaskStatus
}


export async function updateTaskStatusApi(
  payload: UpdateTaskStatusPayload
): Promise<Project> {

  await delay()

  const project = projects.find(
    (project) =>
      project.id === payload.projectId
  )

  if (!project) {
    throw new Error("Project not found")
  }


  const task = project.tasks.find(
    (task) =>
      task.id === payload.taskId
  )

  if (!task) {
    throw new Error("Task not found")
  }


  task.status = payload.status

  return project
}