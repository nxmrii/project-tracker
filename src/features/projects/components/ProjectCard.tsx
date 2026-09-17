import type { Project } from "../project.type"

import {
  calculateProgress,
  isProjectOverdue,
} from "../../../utils/project.utils"

type Props = {
  project: Project
}

function ProjectCard({ project }: Props) {
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

      <button className="view-project-button">
        View Project →
      </button>

    </article>
  )
}

export default ProjectCard