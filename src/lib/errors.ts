import type { ApiError } from "../types/game"

export const createApiError = (message: string, status: number): ApiError => ({
  message,
  status,
  name: "ApiError",
})

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    "name" in error &&
    (error as ApiError).name === "ApiError"
  )
}
