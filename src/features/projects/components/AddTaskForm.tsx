import { useState } from "react"

import type {
  Member,
} from "../project.type"


type Props = {
  members: Member[]

  loading: boolean

  onCancel: () => void

  onSubmit: (data: {
    title: string
    assignedTo: number
    dueDate: string
  }) => void
}


function AddTaskForm({
  members,
  loading,
  onCancel,
  onSubmit,
}: Props) {

  const [title, setTitle] =
    useState("")

  const [assignedTo, setAssignedTo] =
    useState("")

  const [dueDate, setDueDate] =
    useState("")


  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (
      !title.trim() ||
      !assignedTo ||
      !dueDate
    ) {
      return
    }

    onSubmit({
      title: title.trim(),

      assignedTo:
        Number(assignedTo),

      dueDate,
    })

  }


  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">

          <div>

            <h2>Add New Task</h2>

            <p>
              Create and assign a task
              to a team member.
            </p>

          </div>


          <button
            type="button"
            className="close-button"
            onClick={onCancel}
          >
            ×
          </button>

        </div>


        <form
          className="project-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Task Title
            </label>

            <input
              type="text"
              placeholder="Example: Build Login Page"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              autoFocus
            />

          </div>


          <div className="form-group">

            <label>
              Assign To
            </label>

            <select
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(
                  e.target.value
                )
              }
            >

              <option value="">
                Select member
              </option>

              {members.map((member) => (

                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.name}
                  {" - "}
                  {member.role}
                </option>

              ))}

            </select>

          </div>


          <div className="form-group">

            <label>
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

          </div>


          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading
                ? "Adding..."
                : "Add Task"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}


export default AddTaskForm