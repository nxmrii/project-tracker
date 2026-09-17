export type TaskStatus =
  | "todo"
  | "in-progress"
  | "done"


export interface Member {
  id: number
  name: string
  role: string
}


export interface Task {
  id: number
  title: string
  assignedTo: number
  status: TaskStatus
  dueDate: string
}


export interface Project {
  id: number
  name: string
  deadline: string
  members: Member[]
  tasks: Task[]
}