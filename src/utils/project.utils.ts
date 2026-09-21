// Calculate project completion percentage
import type {
  Member,
  Project,
} from "../features/projects/project.type"


export function calculateProgress(project: Project): number {

  if (project.tasks.length === 0) {
    return 0
  }

  const completedTasks = project.tasks.filter(
    (task) => task.status === "done"
  ).length


  //e.x 3 tasks, 2 completed => (2/3)*100 = 66.67 => 67%
  //A function that calculates the percentage of completed tasks out of the total (using reduce or filter)
  return Math.round(
    (completedTasks / project.tasks.length) * 100
  )
}


// A function that returns the number of assigned and completed tasks for each member
export function getMemberContribution(
  project: Project,
  member: Member
) {

  const assignedTasks = project.tasks.filter(
    (task) => task.assignedTo === member.id
  )

  const completedTasks = assignedTasks.filter(
    (task) => task.status === "done"
  )

  return {
    assigned: assignedTasks.length,
    completed: completedTasks.length,
  }
}


//A function that checks whether a project is overdue relative to its deadline
export function isProjectOverdue(project: Project): boolean {

  const today = new Date()

  const deadline = new Date(project.deadline)

  return deadline < today
}

import type { Task } from "../features/projects/project.type"

export function isTaskOverdue(
  task: Task
): boolean {

  if (task.status === "done") {
    return false
  }

  const today = new Date()
  const dueDate = new Date(task.dueDate)

  return dueDate < today
}