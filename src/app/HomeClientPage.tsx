"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/components/Select/Select";
import Typography from "@/components/Typography/Typography";
import { getAvailableGenres } from "../lib/api";
import { useGames } from "@/contexts/GamesContext";

const HomeClientPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, setGenre, initializeFromUrl } = useGames();

  const availableGenres = useMemo(() => getAvailableGenres(), []);

  const selectedGenre = state.selectedGenre;

  // initialize from URL (only one time on mount)
  useEffect(() => {
    const genre = searchParams.get("genre") || "";
    initializeFromUrl({ genre, page: 1 });
  }, [searchParams, initializeFromUrl]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = e.target.value;

    // Update URL
    const params = new URLSearchParams(searchParams);
    if (newGenre) params.set("genre", newGenre);
    else params.delete("genre");

    router.push(`/?${params.toString()}`);

    // trigger fetch
    setGenre(newGenre); // this will internally call fetchGames with new genre
  };

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
