import { useState } from "react"


type Props = {

  civilId: string

  loading: boolean

  onSubmit: (
    otp: string
  ) => void

  onBack: () => void

}


function OtpForm({
  civilId,
  loading,
  onSubmit,
  onBack,
}: Props) {

  const [otp, setOtp] =
    useState("")


  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (otp.length !== 6) {
      return
    }

    onSubmit(otp)
  }


  return (
    <form onSubmit={handleSubmit}>

      <h2>Verify OTP</h2>

      <p>
        Verification code sent for:
      </p>

      <strong>
        {civilId}
      </strong>

      <br />
      <br />

      <label>
        OTP
      </label>

      <input
        type="text"
        maxLength={6}
        value={otp}
        placeholder="123456"
        onChange={(e) =>
          setOtp(
            e.target.value.replace(/\D/g, "")
          )
        }
      />

      <button
        type="submit"
        disabled={
          loading ||
          otp.length !== 6
        }
      >
        {loading
          ? "Verifying..."
          : "Verify OTP"}
      </button>

      <button
        type="button"
        onClick={onBack}
      >
        Change Civil ID
      </button>

    </form>
  )
}


export default OtpForm