import {
  Link,
  useParams,
} from "@tanstack/react-router"

import AppShell
  from "../../../components/layout/AppShell"

import {
  useAddMember,
  useAddTask,
  useUpdateTaskStatus,
  useProject,
} from "../hooks/useProjects"

import {
  calculateProgress,
  getMemberContribution,
  isProjectOverdue,
  isTaskOverdue,
} from "../../../utils/project.utils"

import { useState } from "react"
import AddMemberForm from "../components/AddMemberForm"
import AddTaskForm from "../components/AddTaskForm"


function ProjectDetailsPage() {
  const [showMemberForm, setShowMemberForm] =
  useState(false)

const addMember = useAddMember()

  const { projectId } = useParams({
    strict: false,
  })

  const [showTaskForm, setShowTaskForm] =
  useState(false)

const addTask = useAddTask()

const updateTaskStatus =
  useUpdateTaskStatus()

  

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

         <button
  className="primary-button"
  onClick={() =>
    setShowMemberForm(true)
  }
>
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

          <button
  className="primary-button"
  onClick={() =>
    setShowTaskForm(true)
  }
  disabled={
    project.members.length === 0
  }
>
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

                const taskOverdue =
  isTaskOverdue(task)

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

                    <select
  className={`task-status-select ${task.status}`}

  value={task.status}

  disabled={
    updateTaskStatus.isPending
  }

  onChange={(e) => {

    updateTaskStatus.mutate({
      projectId: id,

      taskId: task.id,

      status:
        e.target.value as
          "todo" |
          "in-progress" |
          "done",
    })

  }}
>
  <option value="todo">
    Todo
  </option>

  <option value="in-progress">
    In Progress
  </option>

  <option value="done">
    Done
  </option>
</select>

                 <div className="task-deadline">

  <span className="task-date">
    {task.dueDate}
  </span>

  {taskOverdue && (
    <span className="task-overdue">
      Overdue
    </span>
  )}

</div>

                  </div>

                </div>
              )
            })}

          </div>

        )}

      </section>

{showMemberForm && (

  <AddMemberForm

    loading={
      addMember.isPending
    }

    onCancel={() =>
      setShowMemberForm(false)
    }

    onSubmit={(data) => {

      addMember.mutate(
        {
          projectId: id,
          name: data.name,
          role: data.role,
        },
        {
          onSuccess: () => {
            setShowMemberForm(false)
          },
        }
      )

    }}

  />

)}

{showTaskForm && (

  <AddTaskForm

    members={
      project.members
    }

    loading={
      addTask.isPending
    }

    onCancel={() =>
      setShowTaskForm(false)
    }

    onSubmit={(data) => {

      addTask.mutate(
        {
          projectId: id,

          title: data.title,

          assignedTo:
            data.assignedTo,

          dueDate:
            data.dueDate,
        },
        {
          onSuccess: () => {
            setShowTaskForm(false)
          },
        }
      )

    }}

  />

)}
    </AppShell>
  )
}


export default ProjectDetailsPage