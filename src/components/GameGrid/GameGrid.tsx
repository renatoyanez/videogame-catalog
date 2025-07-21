"use client";

import { FC } from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Game, ApiParams } from "../../types/game";
import { getGames, getAvailableGenres } from "../../lib/api";
import GameCard from "../GameCard/GameCard";
import Loading from "../Loading/Loading";
import { gameGridClasses } from "./classes";

const GameGrid: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const availableGenres = useMemo(() => getAvailableGenres(), []);

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

  const handleGenreChange = useCallback(
    (genre: string) => {
      setSelectedGenre(genre);
      const params = new URLSearchParams(searchParams.toString());

      if (genre) {
        params.set("genre", genre);
      } else {
        params.delete("genre");
      }

      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

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
      <div className={gameGridClasses.filterContainer}>
        <label htmlFor="genre-select" className={gameGridClasses.filterLabel}>
          Filter by Genre:
        </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => handleGenreChange(e.target.value)}
          className={gameGridClasses.filterSelect}
        >
          <option value="">All Genres</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

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
