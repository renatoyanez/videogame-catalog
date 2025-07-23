"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/components/Select/Select";
import Typography from "@/components/Typography/Typography";
import { getAvailableGenres } from "../lib/api";
import { useFetchGames } from "@/hooks/useFetchGames";

const HomeClientPage = () => {
    const {
    games,
    loading,
    loadingMore,
    error,
    selectedGenre,
    availableFilters,
    hasMorePages,
    isEmpty,
    changeGenre,
    loadMoreGames,
    refetch,
  } = useFetchGames();

  const router = useRouter();
  const searchParams = useSearchParams();

  const availableGenres = useMemo(() => getAvailableGenres(), []);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value
    changeGenre(genre)
  }

  
  return (
    <>
      <div className="desktop:mb-12 mobile:mb-8">
        <Typography variant="h1" className="text-gray-900">
          Top Sellers
        </Typography>
      </div>
      <div className="desktop:pb-12 mobile:pb-8 flex justify-end border-b border-gray-200 last:border-b-0">
          <Select
            value={selectedGenre}
            onChange={handleGenreChange}
            options={availableGenres}
          />
      </div>
    </>
  );
};

export default HomeClientPage;
