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

    if (civilId.length !== 8) {
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
  maxLength={8}
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
  disabled={
    loading ||
    civilId.length !== 8
  }
>
  {loading
    ? "Sending..."
    : "Send OTP"}
</button>
    </form>
  )
}


export default CivilIdForm