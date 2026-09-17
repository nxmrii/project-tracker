import { useMutation } from "@tanstack/react-query"

import { verifyOtpApi } from "../api/auth.api"


export function useVerifyOtp() {

  return useMutation({
    mutationFn: verifyOtpApi,
  })

}