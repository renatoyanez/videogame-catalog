"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"
import type { Game, ApiParams, ApiResponse } from "@/types/game"
import { getGames } from "@/lib/api"

interface GamesState {
  games: Game[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  selectedGenre: string
  currentPage: number
  totalPages: number
  availableFilters: string[]
}

interface GamesContextType {
  state: GamesState
  fetchGames: (params?: ApiParams, append?: boolean) => Promise<void>
  setGenre: (genre: string) => void
  loadMore: () => Promise<void>
  resetGames: () => void
}

const GamesContext = createContext<GamesContextType | undefined>(undefined)

export const GamesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [availableFilters, setAvailableFilters] = useState<string[]>([])

  const fetchGames = useCallback(async (params: ApiParams = {}, append = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
        if (!append) {
          setGames([])
        }
      }
      setError(null)

      // Update selected genre to match the params
      if (params.genre !== undefined) {
        setSelectedGenre(params.genre || "")
      }

      const response: ApiResponse<Game[]> = await getGames(params)

      if (append) {
        setGames((prev) => [...prev, ...response.games])
      } else {
        setGames(response.games)
      }

      setCurrentPage(response.currentPage)
      setTotalPages(response.totalPages)
      setAvailableFilters(response.availableFilters)
    } catch (err) {
      setError("Failed to load games. Please try again.")
      console.error("Error fetching games:", err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const setGenre = useCallback(
    (genre: string) => {
      setSelectedGenre(genre)
      setCurrentPage(1)
      fetchGames({ genre: genre || undefined, page: 1 })
    },
    [fetchGames],
  )

  const loadMore = useCallback(async () => {
    const nextPage = currentPage + 1
    await fetchGames(
      {
        genre: selectedGenre || undefined,
        page: nextPage,
      },
      true,
    )
  }, [currentPage, selectedGenre, fetchGames])

  const resetGames = useCallback(() => {
    setGames([])
    setCurrentPage(1)
  }, [])

  // Memoize the state object to prevent unnecessary re-renders
  const state: GamesState = useMemo(
    () => ({
      games,
      loading,
      loadingMore,
      error,
      selectedGenre,
      currentPage,
      totalPages,
      availableFilters,
    }),
    [games, loading, loadingMore, error, selectedGenre, currentPage, totalPages, availableFilters],
  )

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      fetchGames,
      setGenre,
      loadMore,
      resetGames,
    }),
    [state, fetchGames, setGenre, loadMore, resetGames],
  )

  return <GamesContext.Provider value={contextValue}>{children}</GamesContext.Provider>
}

export const useGames = () => {
  const context = useContext(GamesContext)
  if (context === undefined) {
    throw new Error(
      "useGames must be used within a GamesProvider. " +
        "Make sure to wrap your component or page with <GamesProvider>.",
    )
  }
  return context
}
