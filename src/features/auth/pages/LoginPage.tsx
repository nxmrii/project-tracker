import { useState } from "react"

import { useNavigate } from "@tanstack/react-router"



import { useRequestOtp }
  from "../hooks/useRequestOtp"

import { useVerifyOtp }
  from "../hooks/useVerifyOtp"
import CivilIdForm from "../components/CivilIdForm"
import OtpForm from "../components/OtpForm"


function LoginPage() {
  const navigate = useNavigate()

  const [civilId, setCivilId] =
    useState("")

  const [otpSent, setOtpSent] =
    useState(false)

  const [error, setError] =
    useState("")


  const requestOtp =
    useRequestOtp()

  const verifyOtp =
    useVerifyOtp()


  function handleSendOtp(
    value: string
  ) {

    setError("")

    requestOtp.mutate(
      {
        civilId: value,
      },
      {
        onSuccess: (data) => {

          setCivilId(value)

          setOtpSent(true)

          console.log(
            "Demo OTP:",
            data.demoOtp
          )
        },

        onError: () => {
          setError(
            "Civil ID not found"
          )
        },
      }
    )
  }


  function handleVerifyOtp(
    otp: string
  ) {

    setError("")

    verifyOtp.mutate(
      {
        civilId,
        otp,
      },
      {
       onSuccess: () => {

  navigate({
    to: "/projects",
  })

},

        onError: () => {
          setError(
            "Invalid OTP"
          )
        },
      }
    )
  }


  return (
    <main className="login-page">

      <div className="login-card">

        <h1>
          Project Tracker
        </h1>

        <p>
          Team Project Management System
        </p>


        {error && (
          <div className="error">
            {error}
          </div>
        )}


        {!otpSent ? (

          <CivilIdForm
            loading={
              requestOtp.isPending
            }
            onSubmit={
              handleSendOtp
            }
          />

        ) : (

          <OtpForm
            civilId={civilId}
            loading={
              verifyOtp.isPending
            }
            onSubmit={
              handleVerifyOtp
            }
            onBack={() => {
              setOtpSent(false)
              setError("")
            }}
          />

        )}


        <div className="demo-info">

          <strong>
            Demo Login
          </strong>

          <p>
            Civil ID: 12345678
          </p>

          <p>
            OTP: 123456
          </p>

        </div>

      </div>

    </main>
  )
}


export default LoginPage