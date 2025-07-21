import type { ApiParams } from "../types/game"

export const getUrlParams = (searchParams: URLSearchParams): ApiParams => {
  return {
    genre: searchParams.get("genre") || undefined,
    page: searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : undefined,
  }
}

export const createUrlWithParams = (params: ApiParams): string => {
  const url = new URL(window.location.href)

  if (params.genre) {
    url.searchParams.set("genre", params.genre)
  } else {
    url.searchParams.delete("genre")
  }

  if (params.page) {
    url.searchParams.set("page", params.page.toString())
  } else {
    url.searchParams.delete("page")
  }

  return url.toString()
}
