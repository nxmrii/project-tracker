import { useState } from "react"


type Props = {
  loading: boolean

  onSubmit: (
    civilId: string
  ) => void
}


function CivilIdForm({
  loading,
  onSubmit,
}: Props) {

  const [civilId, setCivilId] =
    useState("")


  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!civilId.trim()) {
      return
    }

    onSubmit(civilId)
  }


  return (
    <form onSubmit={handleSubmit}>

      <h2>Login</h2>

      <p>
        Enter your Civil ID to receive
        a verification code.
      </p>

      <label>
        Civil ID
      </label>

      <input
        type="text"
        value={civilId}
        placeholder="Enter Civil ID"
        onChange={(e) =>
          setCivilId(
            e.target.value.replace(/\D/g, "")
          )
        }
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Send OTP"}
      </button>

    </form>
  )
}


export default CivilIdForm