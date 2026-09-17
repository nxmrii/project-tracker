import {
  Link,
  useParams,
} from "@tanstack/react-router"

import AppShell
  from "../../../components/layout/AppShell"

import { useProject }
  from "../hooks/useProjects"

import {
  calculateProgress,
  getMemberContribution,
  isProjectOverdue,
} from "../../../utils/project.utils"


function ProjectDetailsPage() {

  const { projectId } = useParams({
    strict: false,
  })

  const id = Number(projectId)

  const {
    data: project,
    isLoading,
    isError,
  } = useProject(id)


  if (isLoading) {
    return (
      <AppShell>
        <div className="state-message">
          Loading project...
        </div>
      </AppShell>
    )
  }


  if (isError || !project) {
    return (
      <AppShell>

        <div className="state-message error-state">
          Project not found.
        </div>

      </AppShell>
    )
  }


  const progress =
    calculateProgress(project)

  const overdue =
    isProjectOverdue(project)


  return (
    <AppShell>

      <div className="details-header">

        <div>

          <Link
            to="/projects"
            className="back-link"
          >
            ← Back to Projects
          </Link>

          <h2>
            {project.name}
          </h2>

          <p>
            Manage project members,
            tasks and progress.
          </p>

        </div>


        <span
          className={
            overdue
              ? "deadline-badge overdue"
              : "deadline-badge active"
          }
        >
          {overdue
            ? "Overdue"
            : "Active"}
        </span>

      </div>


      {/* Overview */}

      <div className="overview-grid">

        <div className="overview-card">

          <span>Progress</span>

          <strong>
            {progress}%
          </strong>

        </div>


        <div className="overview-card">

          <span>Members</span>

          <strong>
            {project.members.length}
          </strong>

        </div>


        <div className="overview-card">

          <span>Tasks</span>

          <strong>
            {project.tasks.length}
          </strong>

        </div>


        <div className="overview-card">

          <span>Deadline</span>

          <strong className="date-value">
            {project.deadline}
          </strong>

        </div>

      </div>


      {/* Progress */}

      <section className="details-section">

        <div className="section-header">

          <div>
            <h3>Project Progress</h3>

            <p>
              Overall completion based on
              completed tasks.
            </p>
          </div>

          <strong className="progress-number">
            {progress}%
          </strong>

        </div>


        <div className="details-progress-track">

          <div
            className="details-progress-value"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </section>


      {/* Members */}

      <section className="details-section">

        <div className="section-header">

          <div>
            <h3>Team Members</h3>

            <p>
              Members assigned to this project.
            </p>
          </div>

          <button className="primary-button">
            + Add Member
          </button>

        </div>


        {project.members.length === 0 ? (

          <div className="small-empty-state">
            No members added yet.
          </div>

        ) : (

          <div className="members-list">

            {project.members.map(
              (member) => {

                const contribution =
                  getMemberContribution(
                    project,
                    member
                  )

                return (
                  <div
                    className="member-row"
                    key={member.id}
                  >

                    <div className="member-info">

                      <div className="member-avatar">
                        {member.name.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {member.name}
                        </strong>

                        <span>
                          {member.role}
                        </span>

                      </div>

                    </div>


                    <div className="member-contribution">

                      <strong>
                        {contribution.completed}
                        /
                        {contribution.assigned}
                      </strong>

                      <span>
                        Tasks Completed
                      </span>

                    </div>

                  </div>
                )
              }
            )}

          </div>

        )}

      </section>


      {/* Tasks */}

      <section className="details-section">

        <div className="section-header">

          <div>
            <h3>Tasks</h3>

            <p>
              Track and manage project tasks.
            </p>
          </div>

          <button className="primary-button">
            + Add Task
          </button>

        </div>


        {project.tasks.length === 0 ? (

          <div className="small-empty-state">
            No tasks added yet.
          </div>

        ) : (

          <div className="tasks-list">

            {project.tasks.map((task) => {

              const member =
                project.members.find(
                  (member) =>
                    member.id === task.assignedTo
                )

              return (
                <div
                  className="task-row"
                  key={task.id}
                >

                  <div>

                    <strong>
                      {task.title}
                    </strong>

                    <span>
                      Assigned to:{" "}
                      {member?.name ??
                        "Unassigned"}
                    </span>

                  </div>


                  <div className="task-meta">

                    <span
                      className={`task-status ${task.status}`}
                    >
                      {task.status}
                    </span>

                    <span className="task-date">
                      {task.dueDate}
                    </span>

                  </div>

                </div>
              )
            })}

          </div>

        )}

      </section>

    </AppShell>
  )
}


export default ProjectDetailsPage