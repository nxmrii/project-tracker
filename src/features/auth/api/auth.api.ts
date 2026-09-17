// fake api 

import {
  delay,
  MOCK_CIVIL_ID,
  MOCK_OTP,
  MOCK_TOKEN,
} from "../../../lib/mockStore"

import type {
  RequestOtpPayload,
  VerifyOtpPayload,
} from "../auth.type"


const TOKEN_KEY = "project_tracker_token"


export async function requestOtpApi(
  payload: RequestOtpPayload
) {
  await delay()

  if (payload.civilId !== MOCK_CIVIL_ID) {
    throw new Error("Civil ID not found")
  }

  return {
    success: true,
    demoOtp: MOCK_OTP,
  }
}


export async function verifyOtpApi(
  payload: VerifyOtpPayload
) {
  await delay()

  if (
    payload.civilId !== MOCK_CIVIL_ID ||
    payload.otp !== MOCK_OTP
  ) {
    throw new Error("Invalid OTP")
  }

  localStorage.setItem(
    TOKEN_KEY,
    MOCK_TOKEN
  )

  return {
    success: true,
  }
}


export function hasAuthToken(): boolean {
  return (
    localStorage.getItem(TOKEN_KEY) ===
    MOCK_TOKEN
  )
}


export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}