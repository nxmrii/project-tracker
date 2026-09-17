import { useMutation } from "@tanstack/react-query"

import { requestOtpApi } from "../api/auth.api"


export function useRequestOtp() {

  return useMutation({
    mutationFn: requestOtpApi,
  })

}