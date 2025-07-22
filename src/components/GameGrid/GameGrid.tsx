"use client";

import { useState, useEffect, useCallback, FC } from "react";
import { useSearchParams } from "next/navigation";
import type { Game, ApiParams } from "../../types/game";
import { getGames } from "../../lib/api";
import GameCard from "../GameCard/GameCard";
import Loading from "../Loading/Loading";
import { gameGridClasses } from "./classes";

const GameGrid: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const searchParams = useSearchParams();

  const fetchGames = useCallback(async (params: ApiParams) => {
    try {
      setLoading(true);
      setError(null);
      const gamesData = await getGames(params);
      setGames(gamesData.games);
    } catch (err) {
      setError("Failed to load games. Please try again.");
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const genre = searchParams.get("genre");
    const page = searchParams.get("page");

    if (genre) {
      setSelectedGenre(genre);
    }

    fetchGames({
      genre: genre || undefined,
      page: page ? Number.parseInt(page) : undefined,
    });
  }, [searchParams, fetchGames]);

  if (loading) {
    return <Loading size="lg" text="Loading games..." />;
  }

  if (error) {
    return (
      <div className={gameGridClasses.error}>
        <p className={gameGridClasses.errorText}>{error}</p>
        <button
          onClick={() => fetchGames({ genre: selectedGenre, page: 1 })}
          className={gameGridClasses.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={gameGridClasses.container}>
        {games.length &&
          games.map((game) => <GameCard key={game.id} game={game} />)}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No games found for the selected genre.
          </p>
        </div>
      )}
    </>
  );
};

export default GameGrid;
