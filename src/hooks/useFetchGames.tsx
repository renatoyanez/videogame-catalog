"use client";

import { useMemo } from "react";
import { useGames } from "@/contexts/GamesContext";

export const useFetchGames = () => {
  const { state, fetchGames, setGenre, loadMore, resetGames } = useGames();

  const computedValues = useMemo(
    () => ({
      hasMorePages: state.currentPage < state.totalPages,
      isEmpty: state.games.length === 0 && !state.loading,
    }),
    [state]
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
    [setGenre, state, loadMore, fetchGames]
  );

  return {
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
    hasMorePages: computedValues.hasMorePages,
    isEmpty: computedValues.isEmpty,
  };
};
