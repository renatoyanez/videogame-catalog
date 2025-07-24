"use client";

import type React from "react";
import { useCallback, useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GameCard from "@/components/GameCard/GameCard";
import Loading from "@/components/Loading/Loading";
import Button from "@/components/Button/Button";
import { useFetchGames } from "@/hooks/useFetchGames";

const GameGrid: React.FC = () => {
  const {
    currentPage,
    games,
    loading,
    hasMorePages,
    loadingMore,
    totalPages,
    loadMoreGames,
  } = useFetchGames();

  const handleLoadMore = useCallback(async () => {
    if (currentPage < totalPages && !loadingMore) {
      await loadMoreGames();
    }
  }, [currentPage, totalPages, loadingMore, loadMoreGames]);

  if (loading) {
    return (
      <div className="desktop:my-[48px] mobile:my-[32px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="desktop:my-[48px] mobile:my-[32px]">
      <div className="flex flex-wrap justify-between gap-y-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {hasMorePages && games.length > 0 && (
        <div className="flex mt-8">
          <Button
            onClick={handleLoadMore}
            loading={loadingMore}
            className="text-white font-medium"
          >
            {loadingMore ? "Loading..." : "SEE MORE"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
