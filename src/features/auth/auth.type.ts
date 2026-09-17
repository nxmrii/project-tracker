export interface AuthUser {
  civilId: string
}

export interface RequestOtpPayload {
  civilId: string
}

export interface VerifyOtpPayload {
  civilId: string
  otp: string
}