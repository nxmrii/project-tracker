import type { Project } from "../project.type"

import {
  calculateProgress,
  isProjectOverdue,
} from "../../../utils/project.utils"

import { Link } from "@tanstack/react-router"

type Props = {
  project: Project

  deleting: boolean

  onDelete: (
    projectId: number
  ) => void
}

function ProjectCard({
  project,
  deleting,
  onDelete,
}: Props) {
  const progress = calculateProgress(project)
  const overdue = isProjectOverdue(project)

  return (
    <article className="project-card">

      <div className="project-card-header">

        <div className="project-icon">
          {project.name.charAt(0)}
        </div>

        <span
          className={
            overdue
              ? "deadline-badge overdue"
              : "deadline-badge active"
          }
        >
          {overdue ? "Overdue" : "Active"}
        </span>

      </div>

      <h3>{project.name}</h3>

      <p className="deadline">
        Deadline: {project.deadline}
      </p>

      <div className="project-stats">

        <div>
          <strong>{project.members.length}</strong>
          <span>Members</span>
        </div>

        <div>
          <strong>{project.tasks.length}</strong>
          <span>Tasks</span>
        </div>

        <div>
          <strong>{progress}%</strong>
          <span>Progress</span>
        </div>

      </div>

      <div className="progress-section">

        <div className="progress-header">
          <span>Project Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-value"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      <button
  className="delete-project-button"
  type="button"
  disabled={deleting}
  onClick={() => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${project.name}"?`
      )

    if (confirmed) {
      onDelete(project.id)
    }

  }}
>
  {deleting
    ? "Deleting..."
    : "Delete Project"}
</button>

     <Link
  to="/projects/$projectId"
  params={{
    projectId: String(project.id),
  }}
  className="view-project-button"
>
  View Project →
</Link>

    </article>
  )
}

export default ProjectCard