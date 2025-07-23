"use client";

import type React from "react";
import { useCallback, useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameCard from "@/components/GameCard/GameCard";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import { useGames } from "@/contexts/GamesContext";

const GameGrid: React.FC = () => {
  const searchParams = useSearchParams();
  const [hasInitialized, setHasInitialized] = useState(false);

  const urlGenre = searchParams.get("genre") || "";

  const { state, fetchGames, loadMore } = useGames();

  useEffect(() => {
    if (!hasInitialized) {
      fetchGames({
        genre: urlGenre || undefined,
        page: 1,
      });
      setHasInitialized(true);
    }
  }, [hasInitialized, urlGenre, fetchGames, state.selectedGenre]);

  const handleLoadMore = useCallback(async () => {
    if (state.currentPage < state.totalPages && !state.loadingMore) {
      await loadMore();
    }
  }, [state.currentPage, state.totalPages, state.loadingMore, loadMore]);

  // retry on error
  const handleRetry = useCallback(() => {
    fetchGames({
      genre: state.selectedGenre || undefined,
      page: 1,
    });
  }, [fetchGames, state.selectedGenre]);

  const errorContent = useMemo(
    () => (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600 text-lg mb-4">{state.error}</p>
          <Button onClick={handleRetry} variant="danger">
            Try Again
          </Button>
        </div>
      </div>
    ),
    [state.error, handleRetry]
  );

  // memoize the empty state content
  const emptyContent = useMemo(
    () => (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No games found
          </h3>
          <p className="text-gray-500">
            No games found for the selected genre.
          </p>
        </div>
      </div>
    ),
    []
  );

  // show loading while not initialized or while loading
  if (!hasInitialized || state.loading) {
    return <Loading size="lg" text="Loading games..." />;
  }

  if (state.error) {
    return errorContent;
  }

  const hasMorePages = state.currentPage < state.totalPages;
  const isEmpty = state.games.length === 0;

  return (
    <div className="desktop:my-[48px] mobile:my-[32px]">
      <div className="flex flex-wrap justify-between gap-y-6">
        {state.games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {isEmpty && emptyContent}

      {/* See More Button */}
      {hasMorePages && state.games.length > 0 && (
        <div className="flex mt-8">
          <Button
            onClick={handleLoadMore}
            loading={state.loadingMore}
            className="text-white font-medium"
          >
            {state.loadingMore ? "Loading..." : "SEE MORE"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
