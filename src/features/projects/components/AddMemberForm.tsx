import { useState } from "react"

type Props = {
  loading: boolean
  onSubmit: (data: {
    name: string
    role: string
  }) => void
  onCancel: () => void
}


function AddMemberForm({
  loading,
  onSubmit,
  onCancel,
}: Props) {

  const [name, setName] =
    useState("")

  const [role, setRole] =
    useState("")


  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (
      !name.trim() ||
      !role.trim()
    ) {
      return
    }

    onSubmit({
      name: name.trim(),
      role: role.trim(),
    })

  }


  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <div className="modal-header">

          <div>
            <h2>Add Team Member</h2>

            <p>
              Add a new member to this project.
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
              Member Name
            </label>

            <input
              type="text"
              placeholder="Example: Fatma"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoFocus
            />

          </div>


          <div className="form-group">

            <label>
              Role
            </label>

            <input
              type="text"
              placeholder="Example: Frontend Developer"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
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
                : "Add Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}


export default AddMemberForm