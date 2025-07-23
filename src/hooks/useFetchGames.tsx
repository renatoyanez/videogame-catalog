"use client";

import { useEffect, useMemo } from "react";
import { useGames } from "@/contexts/GamesContext";

interface UseFetchGamesOptions {
  initialLoad?: boolean;
  initialGenre?: string;
  initialPage?: number;
}

export const useFetchGames = (options: UseFetchGamesOptions = {}) => {
  const { initialLoad = true, initialGenre = "", initialPage = 1 } = options;
  const { state, fetchGames, setGenre, loadMore, resetGames } = useGames();

  // Initial load
  useEffect(() => {
    if (initialLoad) {
      fetchGames({
        genre: initialGenre || undefined,
        page: initialPage,
      });
    }
  }, [initialLoad, initialGenre, initialPage, fetchGames]);

  // prevent unnecessary re-calculations
  const computedValues = useMemo(
    () => ({
      hasMorePages: state.currentPage < state.totalPages,
      isEmpty: state.games.length === 0 && !state.loading,
    }),
    [state.currentPage, state.totalPages, state.games.length, state.loading]
  );

  // prevent unnecessary re-creations
  const helpers = useMemo(
    () => ({
      changeGenre: (genre: string) => {
        setGenre(genre);
      },
      loadMoreGames: async () => {
        if (state.currentPage < state.totalPages && !state.loadingMore) {
          await loadMore();
        }
      },
      refetch: () => {
        fetchGames({
          genre: state.selectedGenre || undefined,
          page: 1,
        });
      },
    }),
    [
      setGenre,
      state.currentPage,
      state.totalPages,
      state.loadingMore,
      state.selectedGenre,
      loadMore,
      fetchGames,
    ]
  );

  // prevent unnecessary re-renders
  return useMemo(
    () => ({
      games: state.games,
      loading: state.loading,
      loadingMore: state.loadingMore,
      error: state.error,
      selectedGenre: state.selectedGenre,
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      availableFilters: state.availableFilters,
      changeGenre: helpers.changeGenre,
      loadMoreGames: helpers.loadMoreGames,
      refetch: helpers.refetch,
      resetGames,
      // Computed values
      hasMorePages: computedValues.hasMorePages,
      isEmpty: computedValues.isEmpty,
    }),
    [
      state.games,
      state.loading,
      state.loadingMore,
      state.error,
      state.selectedGenre,
      state.currentPage,
      state.totalPages,
      state.availableFilters,
      helpers.changeGenre,
      helpers.loadMoreGames,
      helpers.refetch,
      resetGames,
      computedValues.hasMorePages,
      computedValues.isEmpty,
    ]
  );
};
