"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGames } from "@/contexts/GamesContext";

interface UseFetchGamesOptions {
  initialLoad?: boolean;
  initialGenre?: string;
  initialPage?: number;
}

export const useFetchGames = (options: UseFetchGamesOptions = {}) => {
  const { initialLoad = true, initialGenre = "", initialPage = 1 } = options;
  const { state, fetchGames, setGenre, loadMore, resetGames } = useGames();

  // needed to create a reference to fetching the first time
  // to avoid calling the api multiple times in the first render
  // remove it if you see it harmless
  const didFetchOnce = useRef(false);

  useEffect(() => {
  if (initialLoad && !didFetchOnce.current) {
    didFetchOnce.current = true;

    fetchGames({
      genre: initialGenre || undefined,
      page: initialPage,
    });
  }
}, [initialLoad, initialGenre, initialPage, fetchGames]);

  const computedValues = useMemo(
    () => ({
      hasMorePages: state.currentPage < state.totalPages,
      isEmpty: state.games.length === 0 && !state.loading,
    }),
    [state.currentPage, state.totalPages, state.games.length, state.loading]
  );

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

  return useMemo(
    () => ({
      // State
      games: state.games,
      loading: state.loading,
      loadingMore: state.loadingMore,
      error: state.error,
      selectedGenre: initialGenre || state.selectedGenre, // Use URL genre if available
      currentPage: state.currentPage,
      totalPages: state.totalPages,
      availableFilters: state.availableFilters,

      // Actions
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
      initialGenre,
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
