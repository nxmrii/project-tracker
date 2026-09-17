import { useState } from "react"

type Props = {
  loading: boolean

  onSubmit: (data: {
    name: string
    deadline: string
  }) => void

  onCancel: () => void
}


function CreateProjectForm({
  loading,
  onSubmit,
  onCancel,
}: Props) {

  const [name, setName] = useState("")
  const [deadline, setDeadline] = useState("")


  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (!name.trim() || !deadline) {
      return
    }

    onSubmit({
      name: name.trim(),
      deadline,
    })

  }


  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">

          <div>
            <h2>Create New Project</h2>

            <p>
              Add the basic information
              for your new project.
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
              Project Name
            </label>

            <input
              type="text"
              placeholder="Example: Mobile Application"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoFocus
            />

          </div>


          <div className="form-group">

            <label>
              Deadline
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) =>
                setDeadline(e.target.value)
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
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}


export default CreateProjectForm